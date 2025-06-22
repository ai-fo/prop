import React, { useState } from 'react';
import { GitHubRepository } from '../types';
import { Card } from '@shared/ui/Card';
import { Badge } from '@shared/ui/Badge';
import { Button } from '@shared/ui/Button';
import styles from './RepositoryList.module.css';

interface RepositoryListProps {
  repositories: GitHubRepository[];
  onSelectRepo: (repo: GitHubRepository) => void;
  selectedRepoId?: number;
}

export const RepositoryList: React.FC<RepositoryListProps> = ({
  repositories,
  onSelectRepo,
  selectedRepoId,
}) => {
  const [filter, setFilter] = useState('');
  const [showPrivate, setShowPrivate] = useState(true);

  const filteredRepos = repositories.filter(repo => {
    const matchesFilter = repo.name.toLowerCase().includes(filter.toLowerCase()) ||
                         (repo.description?.toLowerCase().includes(filter.toLowerCase()) ?? false);
    const matchesPrivacy = showPrivate || !repo.private;
    return matchesFilter && matchesPrivacy;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatSize = (kb: number) => {
    if (kb < 1024) return `${kb} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Vos Repositories GitHub</h2>
        <div className={styles.filters}>
          <input
            type="text"
            placeholder="Rechercher un repository..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={styles.searchInput}
          />
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={showPrivate}
              onChange={(e) => setShowPrivate(e.target.checked)}
            />
            <span>Afficher les repos privés</span>
          </label>
        </div>
      </div>

      <div className={styles.repoGrid}>
        {filteredRepos.map(repo => (
          <Card
            key={repo.id}
            variant={selectedRepoId === repo.id ? 'elevated' : 'default'}
            interactive
            className={`${styles.repoCard} ${selectedRepoId === repo.id ? styles.selected : ''}`}
            onClick={() => onSelectRepo(repo)}
          >
            <div className={styles.repoHeader}>
              <h3 className={styles.repoName}>{repo.name}</h3>
              <div className={styles.badges}>
                {repo.private && (
                  <Badge variant="secondary" size="small">Privé</Badge>
                )}
                {repo.language && (
                  <Badge variant="info" size="small">{repo.language}</Badge>
                )}
              </div>
            </div>

            {repo.description && (
              <p className={styles.repoDescription}>{repo.description}</p>
            )}

            <div className={styles.repoStats}>
              <div className={styles.stat}>
                <svg className={styles.statIcon} viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
                </svg>
                <span>{repo.stargazers_count}</span>
              </div>
              <div className={styles.stat}>
                <svg className={styles.statIcon} viewBox="0 0 16 16" fill="currentColor">
                  <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
                </svg>
                <span>{repo.forks_count}</span>
              </div>
              <div className={styles.stat}>
                <svg className={styles.statIcon} viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                  <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"/>
                </svg>
                <span>{repo.open_issues_count}</span>
              </div>
            </div>

            <div className={styles.repoMeta}>
              <span className={styles.metaItem}>
                Taille: {formatSize(repo.size)}
              </span>
              <span className={styles.metaItem}>
                Mis à jour: {formatDate(repo.updated_at)}
              </span>
            </div>

            {repo.license && (
              <div className={styles.license}>
                <svg className={styles.licenseIcon} viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"/>
                </svg>
                <span>{repo.license.name}</span>
              </div>
            )}

            {selectedRepoId === repo.id && (
              <div className={styles.selectedOverlay}>
                <svg className={styles.checkIcon} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </Card>
        ))}
      </div>

      {filteredRepos.length === 0 && (
        <div className={styles.emptyState}>
          <p>Aucun repository trouvé</p>
        </div>
      )}
    </div>
  );
};