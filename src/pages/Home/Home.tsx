import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '@shared/ui/Hero';
import { Card } from '@shared/ui/Card';
import styles from './Home.module.css';

const features = [
  {
    title: 'Vente Sécurisée',
    description: 'Transactions cryptées et transfert de propriété garanti par smart contracts.',
    icon: '🔒',
  },
  {
    title: 'Évaluation Juste',
    description: 'Algorithmes d\'évaluation basés sur les métriques et la valeur du marché.',
    icon: '💎',
  },
  {
    title: 'Transfert Immédiat',
    description: 'Recevez le code source et tous les droits instantanément après paiement.',
    icon: '⚡',
  },
  {
    title: 'Support Expert',
    description: 'Accompagnement personnalisé pour vendeurs et acheteurs.',
    icon: '🤝',
  },
];

const stats = [
  { value: '2,500+', label: 'Applications vendues' },
  { value: '€15M', label: 'Volume de transactions' },
  { value: '98%', label: 'Satisfaction client' },
  { value: '24h', label: 'Temps moyen de vente' },
];

export const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.home}>
      <Hero
        title="Vendez votre Application en Toute Confiance"
        subtitle="La première plateforme dédiée à la vente de propriété intellectuelle d'applications. Vendez ou achetez des applications complètes avec transfert total des droits."
        ctaText="Vendre une Application"
        secondaryCtaText="Explorer le Catalogue"
        onCtaClick={() => navigate('/sell')}
        onSecondaryCtaClick={() => navigate('/catalog')}
      />

      <section className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Pourquoi Choisir Notre Plateforme?</h2>
          <div className={styles.featureGrid}>
            {features.map((feature, index) => (
              <Card
                key={index}
                variant="glass"
                interactive
                className={styles.featureCard}
              >
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.stats}>
        <div className={styles.statsBackground}>
          <div className={styles.liquidWave1} />
          <div className={styles.liquidWave2} />
        </div>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Nos Chiffres Parlent</h2>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.howItWorks}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Comment Ça Marche?</h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h3 className={styles.stepTitle}>Listez votre Application</h3>
              <p className={styles.stepDescription}>
                Créez une annonce détaillée avec captures d'écran, métriques et documentation.
              </p>
            </div>
            <div className={styles.stepConnector} />
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h3 className={styles.stepTitle}>Négociez le Prix</h3>
              <p className={styles.stepDescription}>
                Recevez des offres et négociez directement avec les acheteurs intéressés.
              </p>
            </div>
            <div className={styles.stepConnector} />
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h3 className={styles.stepTitle}>Transférez en Sécurité</h3>
              <p className={styles.stepDescription}>
                Transaction sécurisée avec transfert automatique des droits et du code source.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <Card variant="glass" className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>Prêt à Vendre votre Application?</h2>
          <p className={styles.ctaDescription}>
            Rejoignez des milliers de développeurs qui ont déjà vendu leurs applications sur notre plateforme.
          </p>
          <button 
            className={styles.ctaButton}
            onClick={() => navigate('/register')}
          >
            Commencer Maintenant
          </button>
        </Card>
      </section>
    </div>
  );
};