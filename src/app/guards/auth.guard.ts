import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAuth } from '../services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const auth = inject(UserAuth);
  const router = inject(Router);

  return auth.isLogged().pipe(
    map((isLogged) => {
      if (isLogged) {
        return true;
      }
      router.navigate(['/auth/login']);
      return false;
    }),
  );
};
