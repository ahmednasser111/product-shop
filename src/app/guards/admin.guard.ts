import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAuth } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(UserAuth);
  const router = inject(Router);

  if (auth.isAdmin()) return true;

  router.navigate(['/']);
  return false;
};