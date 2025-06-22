import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@shared/ui/Card';
import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import { Badge } from '@shared/ui/Badge';
import styles from './Catalog.module.css';

interface Application {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  imageUrl: string;
  seller: {
    name: string;
    verified: boolean;
  };
  metrics: {
    users: number;
    revenue: string;
  };
}

const mockApplications: Application[] = [
  {
    id: '1',
    name: 'TaskMaster Pro',
    description: 'Application de gestion de tâches avec IA intégrée pour optimiser la productivité.',
    price: 45000,
    category: 'Productivité',
    tags: ['SaaS', 'IA', 'B2B'],
    rating: 4.8,
    reviewCount: 124,
    imageUrl: 'https://via.placeholder.com/400x300/667eea/ffffff?text=TaskMaster+Pro',
    seller: {
      name: 'TechVentures Inc.',
      verified: true,
    },
    metrics: {
      users: 15000,
      revenue: '250k€/an',
    },
  },
  {
    id: '2',
    name: 'FitnessPal Mobile',
    description: 'Application mobile de fitness avec suivi personnalisé et communauté active.',
    price: 32000,
    category: 'Santé & Fitness',
    tags: ['Mobile', 'iOS', 'Android'],
    rating: 4.6,
    reviewCount: 89,
    imageUrl: 'https://via.placeholder.com/400x300/10b981/ffffff?text=FitnessPal',
    seller: {
      name: 'HealthTech Solutions',
      verified: true,
    },
    metrics: {
      users: 50000,
      revenue: '180k€/an',
    },
  },
  {
    id: '3',
    name: 'CryptoTracker Elite',
    description: 'Plateforme de suivi et d\'analyse des cryptomonnaies en temps réel.',
    price: 75000,
    category: 'Finance',
    tags: ['Web3', 'API', 'Trading'],
    rating: 4.9,
    reviewCount: 156,
    imageUrl: 'https://via.placeholder.com/400x300/f59e0b/ffffff?text=CryptoTracker',
    seller: {
      name: 'BlockChain Devs',
      verified: true,
    },
    metrics: {
      users: 8000,
      revenue: '450k€/an',
    },
  },
  {
    id: '4',
    name: 'EduLearn Platform',
    description: 'Plateforme e-learning complète avec gestion des cours et certifications.',
    price: 58000,
    category: 'Éducation',
    tags: ['EdTech', 'LMS', 'SaaS'],
    rating: 4.7,
    reviewCount: 203,
    imageUrl: 'https://via.placeholder.com/400x300/3b82f6/ffffff?text=EduLearn',
    seller: {
      name: 'Education First Ltd',
      verified: false,
    },
    metrics: {
      users: 25000,
      revenue: '320k€/an',
    },
  },
  {
    id: '5',
    name: 'SocialBuzz Manager',
    description: 'Outil de gestion des réseaux sociaux avec analyse et planification.',
    price: 38000,
    category: 'Marketing',
    tags: ['Social Media', 'Analytics', 'Automation'],
    rating: 4.5,
    reviewCount: 167,
    imageUrl: 'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=SocialBuzz',
    seller: {
      name: 'Digital Marketing Co',
      verified: true,
    },
    metrics: {
      users: 12000,
      revenue: '200k€/an',
    },
  },
  {
    id: '6',
    name: 'FoodDelivery Express',
    description: 'Application de livraison de nourriture avec système de tracking en temps réel.',
    price: 95000,
    category: 'E-commerce',
    tags: ['Marketplace', 'Mobile', 'Géolocalisation'],
    rating: 4.4,
    reviewCount: 312,
    imageUrl: 'https://via.placeholder.com/400x300/ef4444/ffffff?text=FoodDelivery',
    seller: {
      name: 'QuickCommerce Inc',
      verified: true,
    },
    metrics: {
      users: 75000,
      revenue: '800k€/an',
    },
  },
];

const categories = ['Toutes', 'Productivité', 'Santé & Fitness', 'Finance', 'Éducation', 'Marketing', 'E-commerce'];
const sortOptions = [
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'rating', label: 'Meilleures notes' },
  { value: 'newest', label: 'Plus récentes' },
];

export const Catalog: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Toutes' || app.category === selectedCategory;
    const matchesPrice = app.price >= priceRange.min && app.price <= priceRange.max;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className={styles.catalog}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Découvrez des Applications à Vendre</h1>
        <p className={styles.subtitle}>
          Explorez notre catalogue d'applications avec transfert complet de propriété intellectuelle
        </p>
      </div>

      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <Card variant="glass" className={styles.filterCard}>
            <h3 className={styles.filterTitle}>Filtres</h3>
            
            <div className={styles.filterSection}>
              <label className={styles.filterLabel}>Catégories</label>
              <div className={styles.categoryList}>
                {categories.map(category => (
                  <button
                    key={category}
                    className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterSection}>
              <label className={styles.filterLabel}>Prix maximum</label>
              <input
                type="range"
                min="0"
                max="100000"
                step="5000"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                className={styles.priceSlider}
              />
              <div className={styles.priceDisplay}>
                0€ - {priceRange.max.toLocaleString('fr-FR')}€
              </div>
            </div>
          </Card>
        </aside>

        <main className={styles.main}>
          <div className={styles.searchBar}>
            <Input
              placeholder="Rechercher une application..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.sortSelect}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.resultsInfo}>
            <p>{sortedApplications.length} applications trouvées</p>
          </div>

          <div className={styles.applicationGrid}>
            {sortedApplications.map(app => (
              <Card
                key={app.id}
                variant="default"
                interactive
                className={styles.applicationCard}
              >
                <div className={styles.imageContainer}>
                  <img src={app.imageUrl} alt={app.name} className={styles.appImage} />
                  <div className={styles.priceTag}>
                    {app.price.toLocaleString('fr-FR')}€
                  </div>
                </div>
                
                <div className={styles.appContent}>
                  <div className={styles.appHeader}>
                    <h3 className={styles.appName}>{app.name}</h3>
                    <Badge variant="secondary" size="small">
                      {app.category}
                    </Badge>
                  </div>
                  
                  <p className={styles.appDescription}>{app.description}</p>
                  
                  <div className={styles.appTags}>
                    {app.tags.map(tag => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                  
                  <div className={styles.appMetrics}>
                    <div className={styles.metric}>
                      <span className={styles.metricLabel}>Utilisateurs</span>
                      <span className={styles.metricValue}>{app.metrics.users.toLocaleString()}</span>
                    </div>
                    <div className={styles.metric}>
                      <span className={styles.metricLabel}>Revenus</span>
                      <span className={styles.metricValue}>{app.metrics.revenue}</span>
                    </div>
                  </div>
                  
                  <div className={styles.appFooter}>
                    <div className={styles.seller}>
                      <span className={styles.sellerName}>{app.seller.name}</span>
                      {app.seller.verified && (
                        <Badge variant="success" size="small">Vérifié</Badge>
                      )}
                    </div>
                    <div className={styles.rating}>
                      <span className={styles.stars}>★ {app.rating}</span>
                      <span className={styles.reviewCount}>({app.reviewCount})</span>
                    </div>
                  </div>
                  
                  <Button
                    variant="primary"
                    className={styles.viewButton}
                    onClick={() => navigate(`/app/${app.id}`)}
                  >
                    Voir les détails
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};