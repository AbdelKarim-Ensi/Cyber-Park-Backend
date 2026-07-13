import { HttpInterceptorFn } from '@angular/common/http';

export const interceptInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. On récupère le token de session. 
  // (Vérifie si la clé s'appelle bien 'token' ou 'jwt' dans ton localStorage lors du login)
  const token = localStorage.getItem('token');
  console.log('🔴 INTERCEPTEUR DÉCLENCHÉ ! Voici le token intercepté :', token);
  // 2. Si un token est trouvé, on clone la requête pour y ajouter le fameux en-tête d'autorisation
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}` // C'est ce mot de passe que le backend attend !
      }
    });
    
    // 3. On envoie la requête modifiée au serveur
    return next(clonedReq);
  }

  // 4. S'il n'y a pas de token (ex: utilisateur non connecté), on laisse passer la requête normale
  return next(req);
};