import React from 'react';
import styles from './Hero.module.css';
import { Button } from '../Button';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  secondaryCtaText?: string;
  onCtaClick?: () => void;
  onSecondaryCtaClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText,
  secondaryCtaText,
  onCtaClick,
  onSecondaryCtaClick,
}) => {
  return (
    <section className={styles.hero}>
      <div className={styles.backgroundEffects}>
        <div className={styles.liquidBlob1} />
        <div className={styles.liquidBlob2} />
        <div className={styles.liquidBlob3} />
        <div className={styles.gradientOverlay} />
      </div>
      
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        
        <div className={styles.ctaGroup}>
          {ctaText && (
            <Button
              variant="primary"
              size="large"
              onClick={onCtaClick}
              className={styles.ctaButton}
            >
              {ctaText}
            </Button>
          )}
          {secondaryCtaText && (
            <Button
              variant="glass"
              size="large"
              onClick={onSecondaryCtaClick}
              className={styles.secondaryCtaButton}
            >
              {secondaryCtaText}
            </Button>
          )}
        </div>
      </div>
      
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollDot} />
      </div>
    </section>
  );
};