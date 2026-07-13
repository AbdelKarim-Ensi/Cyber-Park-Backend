import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (!auth.getToken()) {
    router.navigate(['/login']);
    return false;
  }

  if (auth.isAdmin()) {
    return true;
  }

  // Utilisateur connecté mais pas admin → renvoyé vers son dashboard, pas vers login
  router.navigate(['/home/dashboard']);
  return false;
};