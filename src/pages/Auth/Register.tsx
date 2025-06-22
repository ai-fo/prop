import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Card } from '@shared/ui/Card';
import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import styles from './Auth.module.css';

export const Register: React.FC = () => {
  const [searchParams] = useSearchParams();
  const isSeller = searchParams.get('seller') === 'true';
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: isSeller ? 'seller' : 'buyer',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName) {
      newErrors.fullName = 'Le nom complet est requis';
    }
    
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Le mot de passe doit contenir majuscules, minuscules et chiffres';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Veuillez confirmer votre mot de passe';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Vous devez accepter les conditions d\'utilisation';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulation d'une requête API
    setTimeout(() => {
      console.log('Register:', formData);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.backgroundEffects}>
        <div className={styles.liquidBlob1} />
        <div className={styles.liquidBlob2} />
        <div className={styles.liquidBlob3} />
      </div>
      
      <div className={styles.authContainer}>
        <Card variant="glass" className={styles.authCard}>
          <div className={styles.authHeader}>
            <h1 className={styles.authTitle}>Créer un compte</h1>
            <p className={styles.authSubtitle}>
              Rejoignez la marketplace de propriété intellectuelle
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className={styles.authForm}>
            <div className={styles.accountTypeSelector}>
              <label className={`${styles.accountTypeOption} ${formData.accountType === 'buyer' ? styles.active : ''}`}>
                <input
                  type="radio"
                  name="accountType"
                  value="buyer"
                  checked={formData.accountType === 'buyer'}
                  onChange={handleChange}
                />
                <div className={styles.accountTypeContent}>
                  <span className={styles.accountTypeIcon}>🛍️</span>
                  <span className={styles.accountTypeLabel}>Acheteur</span>
                  <span className={styles.accountTypeDesc}>Acheter des applications</span>
                </div>
              </label>
              <label className={`${styles.accountTypeOption} ${formData.accountType === 'seller' ? styles.active : ''}`}>
                <input
                  type="radio"
                  name="accountType"
                  value="seller"
                  checked={formData.accountType === 'seller'}
                  onChange={handleChange}
                />
                <div className={styles.accountTypeContent}>
                  <span className={styles.accountTypeIcon}>💼</span>
                  <span className={styles.accountTypeLabel}>Vendeur</span>
                  <span className={styles.accountTypeDesc}>Vendre vos applications</span>
                </div>
              </label>
            </div>
            
            <div className={styles.formGroup}>
              <Input
                label="Nom complet"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
                placeholder="Jean Dupont"
                autoComplete="name"
              />
            </div>
            
            <div className={styles.formGroup}>
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="nom@exemple.com"
                autoComplete="email"
              />
            </div>
            
            <div className={styles.formGroup}>
              <Input
                label="Mot de passe"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="••••••••"
                hint="8 caractères minimum, avec majuscules, minuscules et chiffres"
                autoComplete="new-password"
              />
            </div>
            
            <div className={styles.formGroup}>
              <Input
                label="Confirmer le mot de passe"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                />
                <span>
                  J'accepte les{' '}
                  <Link to="/terms" className={styles.link}>
                    conditions d'utilisation
                  </Link>{' '}
                  et la{' '}
                  <Link to="/privacy" className={styles.link}>
                    politique de confidentialité
                  </Link>
                </span>
              </label>
              {errors.acceptTerms && (
                <span className={styles.error}>{errors.acceptTerms}</span>
              )}
            </div>
            
            <Button
              type="submit"
              variant="primary"
              size="large"
              className={styles.submitButton}
              loading={isLoading}
              disabled={isLoading}
            >
              Créer mon compte
            </Button>
          </form>
          
          <div className={styles.divider}>
            <span>ou continuer avec</span>
          </div>
          
          <div className={styles.socialLogin}>
            <button className={styles.socialButton}>
              <svg className={styles.socialIcon} viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className={styles.socialButton}>
              <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </div>
          
          <p className={styles.authFooter}>
            Vous avez déjà un compte ?{' '}
            <Link to="/login" className={styles.authLink}>
              Se connecter
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};