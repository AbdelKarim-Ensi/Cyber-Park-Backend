import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth'; // 👈 On importe bien AuthService ici

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth); // 👈 On injecte AuthService
  const router = inject(Router);

  if (auth.getToken()) {
    return true;
  }
  
  router.navigate(['/login']);
  return false;
};