import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

// Usage dans app.routes.ts :
// { path: 'employees', canActivate: [roleGuard(['ADMIN'])], children: [...] }
export function roleGuard(allowedRoles: string[]): CanActivateFn {
  return (route, state) => {
    const auth = inject(Auth);
    const router = inject(Router);

    if (!auth.getToken()) {
      router.navigate(['/login']);
      return false;
    }

    const role = auth.getRole();
    if (role && allowedRoles.includes(role)) {
      return true;
    }

    router.navigate(['/home/dashboard']);
    return false;
  };
}