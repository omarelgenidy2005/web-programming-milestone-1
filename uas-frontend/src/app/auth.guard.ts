import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const user = authService.getUser();
  
  if (!user) {
    // Not logged in
    return router.createUrlTree(['/login']);
  }

  const requiredRoles = route.data['roles'] as Array<string>;
  
  if (requiredRoles && !requiredRoles.includes(user.role)) {
    // Role not authorized
    alert(`Access Denied: You do not have permission to view this page. (Current Role: ${user.role})`);
    return router.createUrlTree(['/']);
  }

  return true;
};
