import { inject } from '@angular/core';
import { UserAuth } from '../services/auth.service';
import { Auth } from '@angular/fire/auth';
import { map } from 'rxjs';
import { Router, CanActivateFn } from '@angular/router';

export const verificationGuard: CanActivateFn = (route, state) => {
  const auth = inject(UserAuth);
  const firebaseAuth = inject(Auth);
  const router = inject(Router);
  return true;
  return auth.isLogged().pipe(
    map((isLogged) => {
      if (!isLogged) {
        router.navigate(['/']);
        return true;
      }
      if (!(firebaseAuth.currentUser?.emailVerified ?? true)) {
        router.navigate(['/verify']);
        return false;
      }
      return true;
    }),
  );
};
