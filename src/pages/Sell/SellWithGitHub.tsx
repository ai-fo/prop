import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@shared/ui/Card';
import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import { Badge } from '@shared/ui/Badge';
import { GitHubConnect, RepositoryList } from '@modules/github';
import { useGitHub } from '@modules/github/hooks/useGitHub';
import { GitHubRepository, RepoVerification } from '@modules/github/types';
import styles from './SellWithGitHub.module.css';

interface SaleFormData {
  price: string;
  description: string;
  includesSupport: boolean;
  supportDuration: string;
  transferDelay: string;
}

export const SellWithGitHub: React.FC = () => {
  const navigate = useNavigate();
  const { user, repositories, isAuthenticated, loadRepositories, verifyRepository } = useGitHub();
  
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepository | null>(null);
  const [verification, setVerification] = useState<RepoVerification | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SaleFormData>({
    price: '',
    description: '',
    includesSupport: false,
    supportDuration: '30',
    transferDelay: 'immediate',
  });

  useEffect(() => {
    if (isAuthenticated && repositories.length === 0) {
      loadRepositories();
    }
  }, [isAuthenticated, repositories.length, loadRepositories]);

  const handleConnect = () => {
    // In production, this would redirect to GitHub OAuth
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&scope=repo,admin:org`;
  };

  const handleSelectRepo = async (repo: GitHubRepository) => {
    setSelectedRepo(repo);
    setIsVerifying(true);
    
    try {
      const result = await verifyRepository(repo.owner.login, repo.name);
      setVerification(result);
    } catch (error) {
      console.error('Failed to verify repository:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleFormChange = (field: keyof SaleFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Submit the listing
    console.log('Submitting listing:', {
      repository: selectedRepo,
      formData,
      verification,
    });
    navigate('/dashboard/seller');
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'A': return 'success';
      case 'B': return 'success';
      case 'C': return 'warning';
      case 'D': return 'warning';
      case 'F': return 'error';
      default: return 'secondary';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Vendre une Application via GitHub</h1>
        <p className={styles.subtitle}>
          Transférez automatiquement la propriété de votre repository après paiement
        </p>
      </div>

      <div className={styles.steps}>
        <div className={`${styles.step} ${currentStep >= 1 ? styles.active : ''}`}>
          <div className={styles.stepNumber}>1</div>
          <div className={styles.stepContent}>
            <h3>Connexion GitHub</h3>
            <p>Connectez votre compte</p>
          </div>
        </div>
        <div className={styles.stepConnector} />
        <div className={`${styles.step} ${currentStep >= 2 ? styles.active : ''}`}>
          <div className={styles.stepNumber}>2</div>
          <div className={styles.stepContent}>
            <h3>Sélection du Repository</h3>
            <p>Choisissez l'application</p>
          </div>
        </div>
        <div className={styles.stepConnector} />
        <div className={`${styles.step} ${currentStep >= 3 ? styles.active : ''}`}>
          <div className={styles.stepNumber}>3</div>
          <div className={styles.stepContent}>
            <h3>Détails de la Vente</h3>
            <p>Prix et conditions</p>
          </div>
        </div>
      </div>

      {currentStep === 1 && (
        <div className={styles.stepContent}>
          <GitHubConnect
            onConnect={handleConnect}
            isConnected={isAuthenticated}
            user={user}
          />
          {isAuthenticated && (
            <div className={styles.actions}>
              <Button
                variant="primary"
                onClick={() => setCurrentStep(2)}
              >
                Continuer
              </Button>
            </div>
          )}
        </div>
      )}

      {currentStep === 2 && (
        <div className={styles.stepContent}>
          <RepositoryList
            repositories={repositories}
            onSelectRepo={handleSelectRepo}
            selectedRepoId={selectedRepo?.id}
          />
          
          {selectedRepo && verification && (
            <Card variant="glass" className={styles.verificationCard}>
              <h3 className={styles.verificationTitle}>Vérification du Repository</h3>
              <div className={styles.verificationGrid}>
                <div className={styles.verificationItem}>
                  <span className={styles.verificationLabel}>Qualité du Code</span>
                  <Badge variant={getQualityColor(verification.codeQuality)} size="small">
                    Note {verification.codeQuality}
                  </Badge>
                </div>
                <div className={styles.verificationItem}>
                  <span className={styles.verificationLabel}>Licence</span>
                  <Badge variant={verification.hasLicense ? 'success' : 'error'} size="small">
                    {verification.hasLicense ? 'Présente' : 'Absente'}
                  </Badge>
                </div>
                <div className={styles.verificationItem}>
                  <span className={styles.verificationLabel}>Tests</span>
                  <Badge variant={verification.hasTests ? 'success' : 'warning'} size="small">
                    {verification.hasTests ? 'Présents' : 'Absents'}
                  </Badge>
                </div>
                <div className={styles.verificationItem}>
                  <span className={styles.verificationLabel}>Contributeurs</span>
                  <span className={styles.verificationValue}>{verification.contributors}</span>
                </div>
              </div>
              {verification.hasSecrets && (
                <div className={styles.warning}>
                  ⚠️ Des fichiers sensibles ont été détectés. Assurez-vous de les retirer avant la vente.
                </div>
              )}
            </Card>
          )}
          
          {selectedRepo && (
            <div className={styles.actions}>
              <Button
                variant="ghost"
                onClick={() => setCurrentStep(1)}
              >
                Retour
              </Button>
              <Button
                variant="primary"
                onClick={() => setCurrentStep(3)}
                disabled={isVerifying}
              >
                Continuer
              </Button>
            </div>
          )}
        </div>
      )}

      {currentStep === 3 && selectedRepo && (
        <div className={styles.stepContent}>
          <Card className={styles.formCard}>
            <h3 className={styles.formTitle}>Détails de la Vente</h3>
            
            <div className={styles.selectedRepo}>
              <h4>{selectedRepo.name}</h4>
              <p>{selectedRepo.description}</p>
            </div>

            <div className={styles.formGrid}>
              <Input
                label="Prix de vente (€)"
                type="number"
                value={formData.price}
                onChange={(e) => handleFormChange('price', e.target.value)}
                placeholder="45000"
              />
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Délai de transfert</label>
                <select
                  className={styles.select}
                  value={formData.transferDelay}
                  onChange={(e) => handleFormChange('transferDelay', e.target.value)}
                >
                  <option value="immediate">Immédiat après paiement</option>
                  <option value="24h">24 heures</option>
                  <option value="48h">48 heures</option>
                  <option value="7d">7 jours</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Description détaillée</label>
              <textarea
                className={styles.textarea}
                rows={6}
                value={formData.description}
                onChange={(e) => handleFormChange('description', e.target.value)}
                placeholder="Décrivez votre application, ses fonctionnalités, la stack technique..."
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.includesSupport}
                  onChange={(e) => handleFormChange('includesSupport', e.target.checked)}
                />
                <span>Inclure un support après-vente</span>
              </label>
              
              {formData.includesSupport && (
                <select
                  className={styles.select}
                  value={formData.supportDuration}
                  onChange={(e) => handleFormChange('supportDuration', e.target.value)}
                >
                  <option value="30">30 jours</option>
                  <option value="60">60 jours</option>
                  <option value="90">90 jours</option>
                  <option value="180">6 mois</option>
                </select>
              )}
            </div>

            <div className={styles.summary}>
              <h4>Résumé de la Transaction</h4>
              <div className={styles.summaryItem}>
                <span>Commission plateforme (10%)</span>
                <span>{formData.price ? `${(parseInt(formData.price) * 0.1).toFixed(0)}€` : '0€'}</span>
              </div>
              <div className={styles.summaryItem}>
                <span>Vous recevrez</span>
                <span className={styles.summaryTotal}>
                  {formData.price ? `${(parseInt(formData.price) * 0.9).toFixed(0)}€` : '0€'}
                </span>
              </div>
            </div>
          </Card>
          
          <div className={styles.actions}>
            <Button
              variant="ghost"
              onClick={() => setCurrentStep(2)}
            >
              Retour
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={!formData.price || !formData.description}
            >
              Publier l'Annonce
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};