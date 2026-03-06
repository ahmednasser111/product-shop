import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';
import { verificationGuard } from './guards/verification-guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayout,
    canActivate: [guestGuard],
    children: [
      { path: 'login', loadComponent: () => import('./pages/login/login').then((m) => m.Login) },
      {
        path: 'register',
        loadComponent: () => import('./pages/register/register').then((m) => m.Register),
      },
    ],
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        canActivate: [authGuard, verificationGuard],
        loadComponent: () => import('./pages/home/home').then((m) => m.Home),
      },
      {
        path: 'verify',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/verification/verification').then((m) => m.Verification),
      },
      {
        path: 'products',
        canActivate: [authGuard, verificationGuard],
        loadComponent: () => import('./pages/products/products').then((m) => m.Products),
      },
      {
        path: 'product/:id',
        canActivate: [authGuard, verificationGuard],
        loadComponent: () => import('./pages/product/product').then((m) => m.Product),
      },

      {
        path: 'products/add',
        canActivate: [authGuard, adminGuard, verificationGuard],
        loadComponent: () => import('./pages/product-form/product-form').then((m) => m.ProductForm),
      },
      {
        path: 'products/edit/:id',
        canActivate: [authGuard, adminGuard, verificationGuard],
        loadComponent: () => import('./pages/product-form/product-form').then((m) => m.ProductForm),
      },
    ],
  },

  { path: '**', redirectTo: '' },
];
