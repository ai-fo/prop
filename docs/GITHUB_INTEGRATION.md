# Intégration GitHub pour la Vente de Repositories

## Configuration

### 1. Créer une GitHub OAuth App

1. Allez sur [GitHub Developer Settings](https://github.com/settings/developers)
2. Cliquez sur "New OAuth App"
3. Remplissez les informations :
   - **Application name**: IP Marketplace
   - **Homepage URL**: http://localhost:5173 (dev) ou votre URL de production
   - **Authorization callback URL**: http://localhost:5173/auth/github/callback
4. Notez le **Client ID** et générez un **Client Secret**

### 2. Configuration de l'environnement

Créez un fichier `.env` à la racine du projet :

```env
VITE_GITHUB_CLIENT_ID=your_client_id_here
VITE_GITHUB_CLIENT_SECRET=your_client_secret_here
VITE_APP_URL=http://localhost:5173
```

### 3. Backend nécessaire

Pour que l'intégration fonctionne complètement, vous aurez besoin d'un backend qui :

1. **Gère l'OAuth flow** :
   ```javascript
   // Endpoint: POST /api/auth/github
   app.post('/api/auth/github', async (req, res) => {
     const { code } = req.body;
     
     // Exchange code for access token
     const response = await fetch('https://github.com/login/oauth/access_token', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         client_id: process.env.GITHUB_CLIENT_ID,
         client_secret: process.env.GITHUB_CLIENT_SECRET,
         code,
       }),
     });
     
     const { access_token } = await response.json();
     
     // Store token securely and return to frontend
     res.json({ access_token });
   });
   ```

2. **Gère le transfert de repository** :
   ```javascript
   // Endpoint: POST /api/transfer-repo
   app.post('/api/transfer-repo', async (req, res) => {
     const { repoOwner, repoName, newOwner, sellerToken } = req.body;
     
     // Verify payment is complete
     if (!await verifyPayment(req.body.paymentId)) {
       return res.status(400).json({ error: 'Payment not verified' });
     }
     
     // Transfer repository
     const response = await fetch(
       `https://api.github.com/repos/${repoOwner}/${repoName}/transfer`,
       {
         method: 'POST',
         headers: {
           'Authorization': `Bearer ${sellerToken}`,
           'Accept': 'application/vnd.github.v3+json',
         },
         body: JSON.stringify({ new_owner: newOwner }),
       }
     );
     
     res.json(await response.json());
   });
   ```

## Flux de vente complet

### 1. Vendeur

1. Se connecte avec GitHub
2. Sélectionne un repository
3. Définit le prix et les conditions
4. L'app vérifie automatiquement :
   - Propriété du repo
   - Qualité du code
   - Présence de licence
   - Tests
   - Secrets exposés

### 2. Acheteur

1. Parcourt le catalogue
2. Consulte les détails du repo
3. Procède au paiement
4. Fournit son username GitHub

### 3. Transfert automatique

1. Après validation du paiement
2. Le système transfère automatiquement le repo
3. Révoque les accès du vendeur
4. Notifie les deux parties

## Sécurité

### Points importants :

1. **Ne jamais exposer le Client Secret** côté frontend
2. **Stocker les tokens de manière sécurisée** (chiffrés en base de données)
3. **Implémenter un système d'escrow** pour sécuriser les transactions
4. **Vérifier la propriété** avant tout transfert
5. **Logger toutes les actions** pour l'audit

### Limitations GitHub

- Le transfert nécessite que l'acheteur ait un compte GitHub
- Certains repos avec GitHub Actions payantes peuvent nécessiter une intervention manuelle
- Les repos avec des secrets doivent être nettoyés avant le transfert

## Testing

Pour tester l'intégration :

1. Créez un repo de test
2. Utilisez deux comptes GitHub (vendeur/acheteur)
3. Testez le flux complet en environnement de staging
4. Vérifiez que tous les accès sont bien transférés

## Support

Pour toute question sur l'intégration GitHub, consultez :
- [GitHub API Documentation](https://docs.github.com/en/rest)
- [OAuth Apps Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps)