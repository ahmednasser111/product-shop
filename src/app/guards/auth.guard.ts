import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAuth } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(UserAuth);
  const router = inject(Router);

  if (auth.isLogged()) return true;

  router.navigate(['/login']);
  return false;
};