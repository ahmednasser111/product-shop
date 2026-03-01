import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAuth } from '../services/auth.service';

export const guestGuard: CanActivateFn = () => {
  const auth = inject(UserAuth);
  const router = inject(Router);

  if (!auth.isAuth()) {
    return true;
  }

  router.navigate(['/']);
  return false;
}
