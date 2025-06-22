import { GitHubUser, GitHubRepository, GitHubAuth, RepoVerification } from '../types';

const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_OAUTH_BASE = 'https://github.com/login/oauth';

export class GitHubService {
  private accessToken: string | null = null;

  // OAuth flow
  getAuthUrl(clientId: string, redirectUri: string): string {
    const scope = 'repo admin:org read:user user:email';
    return `${GITHUB_OAUTH_BASE}/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  }

  async exchangeCodeForToken(code: string, clientId: string, clientSecret: string): Promise<GitHubAuth> {
    const response = await fetch(`${GITHUB_OAUTH_BASE}/access_token`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const data = await response.json();
    if (data.access_token) {
      this.accessToken = data.access_token;
      return data;
    }
    throw new Error('Failed to exchange code for token');
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  // User operations
  async getCurrentUser(): Promise<GitHubUser> {
    const response = await this.makeRequest('/user');
    return response;
  }

  // Repository operations
  async getUserRepositories(): Promise<GitHubRepository[]> {
    const repos: GitHubRepository[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await this.makeRequest(`/user/repos?page=${page}&per_page=100&sort=updated`);
      repos.push(...response);
      hasMore = response.length === 100;
      page++;
    }

    return repos;
  }

  async getRepository(owner: string, repo: string): Promise<GitHubRepository> {
    return this.makeRequest(`/repos/${owner}/${repo}`);
  }

  async transferRepository(owner: string, repo: string, newOwner: string): Promise<any> {
    return this.makeRequest(`/repos/${owner}/${repo}/transfer`, {
      method: 'POST',
      body: JSON.stringify({ new_owner: newOwner }),
    });
  }

  // Verification operations
  async verifyRepository(owner: string, repo: string): Promise<RepoVerification> {
    const [repoData, contributors, languages, contents] = await Promise.all([
      this.getRepository(owner, repo),
      this.makeRequest(`/repos/${owner}/${repo}/contributors`),
      this.makeRequest(`/repos/${owner}/${repo}/languages`),
      this.makeRequest(`/repos/${owner}/${repo}/contents`).catch(() => []),
    ]);

    // Check for common test directories
    const hasTests = contents.some((item: any) => 
      ['test', 'tests', '__tests__', 'spec'].includes(item.name.toLowerCase())
    );

    // Check for secrets (basic check)
    const hasSecrets = contents.some((item: any) => 
      item.name.includes('.env') || item.name === '.secrets'
    );

    // Calculate basic code quality (simplified)
    let codeQuality: 'A' | 'B' | 'C' | 'D' | 'F' = 'C';
    if (repoData.stargazers_count > 100) codeQuality = 'A';
    else if (repoData.stargazers_count > 50) codeQuality = 'B';
    else if (repoData.stargazers_count > 10) codeQuality = 'C';
    else if (repoData.stargazers_count > 0) codeQuality = 'D';
    else codeQuality = 'F';

    return {
      hasLicense: !!repoData.license,
      dependencies: Object.keys(languages),
      lastCommit: new Date(repoData.pushed_at),
      contributors: contributors.length,
      codeQuality,
      hasSecrets,
      hasTests,
    };
  }

  // Helper method for API requests
  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    if (!this.accessToken) {
      throw new Error('No access token available');
    }

    const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'GitHub API request failed');
    }

    return response.json();
  }
}

export const githubService = new GitHubService();