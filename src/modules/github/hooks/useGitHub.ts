import { useState, useEffect, useCallback } from 'react';
import { githubService } from '../services/githubService';
import { GitHubUser, GitHubRepository, RepoVerification } from '../types';

export const useGitHub = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is authenticated
  const isAuthenticated = useCallback(() => {
    const token = localStorage.getItem('github_token');
    if (token) {
      githubService.setAccessToken(token);
      return true;
    }
    return false;
  }, []);

  // Load user data
  const loadUser = useCallback(async () => {
    if (!isAuthenticated()) return;
    
    setLoading(true);
    try {
      const userData = await githubService.getCurrentUser();
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load user');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Load repositories
  const loadRepositories = useCallback(async () => {
    if (!isAuthenticated()) return;
    
    setLoading(true);
    try {
      const repos = await githubService.getUserRepositories();
      setRepositories(repos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load repositories');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Verify repository
  const verifyRepository = useCallback(async (owner: string, repo: string): Promise<RepoVerification | null> => {
    if (!isAuthenticated()) return null;
    
    try {
      return await githubService.verifyRepository(owner, repo);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify repository');
      return null;
    }
  }, [isAuthenticated]);

  // Transfer repository
  const transferRepository = useCallback(async (owner: string, repo: string, newOwner: string) => {
    if (!isAuthenticated()) throw new Error('Not authenticated');
    
    try {
      return await githubService.transferRepository(owner, repo, newOwner);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to transfer repository');
      throw err;
    }
  }, [isAuthenticated]);

  // Login with GitHub
  const login = useCallback((code: string) => {
    // In a real app, this would call your backend to exchange the code for a token
    // For now, we'll simulate it
    console.log('GitHub login with code:', code);
    // Backend would return the access token
    const mockToken = 'mock_github_token';
    localStorage.setItem('github_token', mockToken);
    githubService.setAccessToken(mockToken);
    loadUser();
  }, [loadUser]);

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem('github_token');
    setUser(null);
    setRepositories([]);
  }, []);

  // Auto-load user on mount if authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      loadUser();
    }
  }, [isAuthenticated, loadUser]);

  return {
    user,
    repositories,
    loading,
    error,
    isAuthenticated: isAuthenticated(),
    login,
    logout,
    loadRepositories,
    verifyRepository,
    transferRepository,
  };
};