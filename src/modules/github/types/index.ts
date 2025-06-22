export interface GitHubUser {
  id: number;
  login: string;
  name: string;
  email: string;
  avatar_url: string;
  html_url: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  private: boolean;
  html_url: string;
  clone_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  license: {
    key: string;
    name: string;
  } | null;
  topics: string[];
  owner: {
    login: string;
    id: number;
    avatar_url: string;
  };
  permissions?: {
    admin: boolean;
    push: boolean;
    pull: boolean;
  };
}

export interface GitHubTransferRequest {
  new_owner: string;
  team_ids?: number[];
}

export interface GitHubAuth {
  access_token: string;
  token_type: string;
  scope: string;
}

export interface RepoVerification {
  hasLicense: boolean;
  dependencies: string[];
  lastCommit: Date;
  contributors: number;
  codeQuality: 'A' | 'B' | 'C' | 'D' | 'F';
  hasSecrets: boolean;
  hasTests: boolean;
  testCoverage?: number;
}