import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@shared/ui/Card';
import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import styles from './Auth.module.css';

export const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
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
      console.log('Login:', formData);
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
            <h1 className={styles.authTitle}>Bon retour !</h1>
            <p className={styles.authSubtitle}>
              Connectez-vous pour accéder à votre compte
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className={styles.authForm}>
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
                autoComplete="current-password"
              />
            </div>
            
            <div className={styles.formActions}>
              <label className={styles.rememberMe}>
                <input type="checkbox" />
                <span>Se souvenir de moi</span>
              </label>
              <Link to="/forgot-password" className={styles.forgotLink}>
                Mot de passe oublié ?
              </Link>
            </div>
            
            <Button
              type="submit"
              variant="primary"
              size="large"
              className={styles.submitButton}
              loading={isLoading}
              disabled={isLoading}
            >
              Se connecter
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
              <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="#000">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              Facebook
            </button>
          </div>
          
          <p className={styles.authFooter}>
            Pas encore de compte ?{' '}
            <Link to="/register" className={styles.authLink}>
              Créer un compte
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};