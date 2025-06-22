import React from 'react';
import { Button } from '@shared/ui/Button';
import { Card } from '@shared/ui/Card';
import styles from './GitHubConnect.module.css';

interface GitHubConnectProps {
  onConnect: () => void;
  isConnected: boolean;
  user?: {
    name: string;
    login: string;
    avatar_url: string;
  } | null;
}

export const GitHubConnect: React.FC<GitHubConnectProps> = ({
  onConnect,
  isConnected,
  user,
}) => {
  if (isConnected && user) {
    return (
      <Card variant="glass" className={styles.connectedCard}>
        <div className={styles.userInfo}>
          <img src={user.avatar_url} alt={user.name} className={styles.avatar} />
          <div className={styles.userDetails}>
            <h4 className={styles.userName}>{user.name}</h4>
            <p className={styles.userLogin}>@{user.login}</p>
          </div>
          <div className={styles.badge}>
            <svg className={styles.checkIcon} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Connecté
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="glass" className={styles.connectCard}>
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          <svg className={styles.githubIcon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </div>
        <h3 className={styles.title}>Connecter votre GitHub</h3>
        <p className={styles.description}>
          Connectez votre compte GitHub pour pouvoir vendre vos repositories en toute sécurité.
        </p>
        <Button
          variant="primary"
          onClick={onConnect}
          className={styles.connectButton}
        >
          <svg className={styles.buttonIcon} viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"/>
          </svg>
          Se connecter avec GitHub
        </Button>
      </div>
    </Card>
  );
};