import React, { useState } from 'react';
import { Card } from '@shared/ui/Card';
import { Button } from '@shared/ui/Button';
import { Badge } from '@shared/ui/Badge';
import styles from './BuyerDashboard.module.css';

interface PurchasedApp {
  id: string;
  name: string;
  description: string;
  purchaseDate: string;
  price: number;
  seller: string;
  status: 'active' | 'transferred' | 'pending';
  imageUrl: string;
  downloadUrl?: string;
  documentationUrl?: string;
  supportUrl?: string;
  lastUpdated: string;
}

interface SavedApp {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  seller: string;
  addedDate: string;
}

const mockPurchasedApps: PurchasedApp[] = [
  {
    id: '1',
    name: 'TaskMaster Pro',
    description: 'Application de gestion de tâches avec IA intégrée',
    purchaseDate: '2024-01-15',
    price: 45000,
    seller: 'TechVentures Inc.',
    status: 'active',
    imageUrl: 'https://via.placeholder.com/400x300/667eea/ffffff?text=TaskMaster+Pro',
    downloadUrl: '#download',
    documentationUrl: '#docs',
    supportUrl: '#support',
    lastUpdated: '2024-01-20',
  },
  {
    id: '2',
    name: 'CryptoTracker Elite',
    description: 'Plateforme de suivi des cryptomonnaies',
    purchaseDate: '2023-12-20',
    price: 75000,
    seller: 'BlockChain Devs',
    status: 'active',
    imageUrl: 'https://via.placeholder.com/400x300/f59e0b/ffffff?text=CryptoTracker',
    downloadUrl: '#download',
    documentationUrl: '#docs',
    supportUrl: '#support',
    lastUpdated: '2024-01-10',
  },
  {
    id: '3',
    name: 'EduLearn Platform',
    description: 'Plateforme e-learning complète',
    purchaseDate: '2023-11-10',
    price: 58000,
    seller: 'Education First Ltd',
    status: 'pending',
    imageUrl: 'https://via.placeholder.com/400x300/3b82f6/ffffff?text=EduLearn',
    lastUpdated: '2023-11-10',
  },
];

const mockSavedApps: SavedApp[] = [
  {
    id: '4',
    name: 'FitnessPal Mobile',
    price: 32000,
    imageUrl: 'https://via.placeholder.com/400x300/10b981/ffffff?text=FitnessPal',
    seller: 'HealthTech Solutions',
    addedDate: '2024-01-22',
  },
  {
    id: '5',
    name: 'SocialBuzz Manager',
    price: 38000,
    imageUrl: 'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=SocialBuzz',
    seller: 'Digital Marketing Co',
    addedDate: '2024-01-20',
  },
];

const mockTransactions = [
  { id: '1', date: '2024-01-15', app: 'TaskMaster Pro', amount: 45000, status: 'completed' },
  { id: '2', date: '2023-12-20', app: 'CryptoTracker Elite', amount: 75000, status: 'completed' },
  { id: '3', date: '2023-11-10', app: 'EduLearn Platform', amount: 58000, status: 'pending' },
];

export const BuyerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'pending'>('all');

  const filteredApps = mockPurchasedApps.filter(app => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return app.status === 'active';
    if (activeTab === 'pending') return app.status === 'pending';
    return true;
  });

  const totalSpent = mockPurchasedApps.reduce((sum, app) => sum + app.price, 0);
  const activeApps = mockPurchasedApps.filter(app => app.status === 'active').length;
  const pendingTransfers = mockPurchasedApps.filter(app => app.status === 'pending').length;

  return (
    <div className={styles.dashboard}>
      <div className={styles.backgroundEffects}>
        <div className={styles.liquidShape1} />
        <div className={styles.liquidShape2} />
      </div>

      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Mon Dashboard Acheteur</h1>
            <p className={styles.subtitle}>Gérez vos applications achetées</p>
          </div>
          <Button variant="primary" onClick={() => console.log('Browse catalog')}>
            Explorer le catalogue
          </Button>
        </header>

        <div className={styles.metricsGrid}>
          <Card variant="glass" className={styles.metricCard}>
            <div className={styles.metricIcon}>📦</div>
            <div className={styles.metricContent}>
              <div className={styles.metricValue}>{mockPurchasedApps.length}</div>
              <div className={styles.metricLabel}>Applications achetées</div>
            </div>
          </Card>
          <Card variant="glass" className={styles.metricCard}>
            <div className={styles.metricIcon}>✅</div>
            <div className={styles.metricContent}>
              <div className={styles.metricValue}>{activeApps}</div>
              <div className={styles.metricLabel}>Applications actives</div>
            </div>
          </Card>
          <Card variant="glass" className={styles.metricCard}>
            <div className={styles.metricIcon}>⏳</div>
            <div className={styles.metricContent}>
              <div className={styles.metricValue}>{pendingTransfers}</div>
              <div className={styles.metricLabel}>Transferts en attente</div>
            </div>
          </Card>
          <Card variant="glass" className={styles.metricCard}>
            <div className={styles.metricIcon}>💰</div>
            <div className={styles.metricContent}>
              <div className={styles.metricValue}>{totalSpent.toLocaleString('fr-FR')}€</div>
              <div className={styles.metricLabel}>Total dépensé</div>
            </div>
          </Card>
        </div>

        <div className={styles.mainGrid}>
          <section className={styles.mainSection}>
            <Card className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Mes Applications</h2>
                <div className={styles.tabs}>
                  <button
                    className={`${styles.tab} ${activeTab === 'all' ? styles.active : ''}`}
                    onClick={() => setActiveTab('all')}
                  >
                    Toutes ({mockPurchasedApps.length})
                  </button>
                  <button
                    className={`${styles.tab} ${activeTab === 'active' ? styles.active : ''}`}
                    onClick={() => setActiveTab('active')}
                  >
                    Actives ({activeApps})
                  </button>
                  <button
                    className={`${styles.tab} ${activeTab === 'pending' ? styles.active : ''}`}
                    onClick={() => setActiveTab('pending')}
                  >
                    En attente ({pendingTransfers})
                  </button>
                </div>
              </div>

              <div className={styles.appsGrid}>
                {filteredApps.map(app => (
                  <Card key={app.id} variant="default" interactive className={styles.appCard}>
                    <div className={styles.appImage}>
                      <img src={app.imageUrl} alt={app.name} />
                      <Badge
                        variant={app.status === 'active' ? 'success' : 'warning'}
                        size="small"
                        className={styles.statusBadge}
                      >
                        {app.status === 'active' ? 'Active' : 'En attente'}
                      </Badge>
                    </div>
                    <div className={styles.appContent}>
                      <h3 className={styles.appName}>{app.name}</h3>
                      <p className={styles.appDescription}>{app.description}</p>
                      <div className={styles.appMeta}>
                        <span className={styles.appSeller}>{app.seller}</span>
                        <span className={styles.appDate}>Acheté le {new Date(app.purchaseDate).toLocaleDateString('fr-FR')}</span>
                      </div>
                      {app.status === 'active' && (
                        <div className={styles.appActions}>
                          <Button variant="primary" size="small" onClick={() => console.log('Download', app.id)}>
                            Télécharger
                          </Button>
                          <Button variant="ghost" size="small" onClick={() => console.log('Documentation', app.id)}>
                            Documentation
                          </Button>
                          <Button variant="ghost" size="small" onClick={() => console.log('Support', app.id)}>
                            Support
                          </Button>
                        </div>
                      )}
                      {app.status === 'pending' && (
                        <div className={styles.pendingMessage}>
                          <p>Transfert en cours... Vous recevrez un email dès que l'application sera disponible.</p>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </section>

          <aside className={styles.sidebar}>
            <Card variant="glass" className={styles.sideCard}>
              <h3 className={styles.sideTitle}>Applications sauvegardées</h3>
              <div className={styles.savedApps}>
                {mockSavedApps.map(app => (
                  <div key={app.id} className={styles.savedApp}>
                    <img src={app.imageUrl} alt={app.name} className={styles.savedAppImage} />
                    <div className={styles.savedAppInfo}>
                      <h4 className={styles.savedAppName}>{app.name}</h4>
                      <p className={styles.savedAppPrice}>{app.price.toLocaleString('fr-FR')}€</p>
                    </div>
                    <Button variant="ghost" size="small" onClick={() => console.log('View', app.id)}>
                      Voir
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            <Card variant="glass" className={styles.sideCard}>
              <h3 className={styles.sideTitle}>Historique des transactions</h3>
              <div className={styles.transactions}>
                {mockTransactions.map(transaction => (
                  <div key={transaction.id} className={styles.transaction}>
                    <div className={styles.transactionInfo}>
                      <p className={styles.transactionApp}>{transaction.app}</p>
                      <p className={styles.transactionDate}>{new Date(transaction.date).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div className={styles.transactionAmount}>
                      <span>{transaction.amount.toLocaleString('fr-FR')}€</span>
                      <Badge
                        variant={transaction.status === 'completed' ? 'success' : 'warning'}
                        size="small"
                      >
                        {transaction.status === 'completed' ? 'Complété' : 'En attente'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card variant="glass" className={styles.sideCard}>
              <h3 className={styles.sideTitle}>Besoin d'aide ?</h3>
              <div className={styles.helpSection}>
                <p>Notre équipe support est là pour vous aider avec vos achats.</p>
                <Button variant="primary" size="small" className={styles.helpButton}>
                  Contacter le support
                </Button>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};