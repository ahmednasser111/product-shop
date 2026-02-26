import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';

export const routes: Routes = [
  // ── no navbar ─────────────────────────────────────────────
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: 'login',    loadComponent: () => import('./pages/login/login').then(m => m.Login) },
      { path: 'register', loadComponent: () => import('./pages/register/register').then(m => m.Register) },
    ]
  },

  {
    path: '',
    component: MainLayout,
    children: [
      { path: '',           loadComponent: () => import('./pages/home/home').then(m => m.Home) },
      { path: 'products',   loadComponent: () => import('./pages/products/products').then(m => m.Products) },
      { path: 'product/:id',loadComponent: () => import('./pages/product/product').then(m => m.Product) },

      { path: 'products/add',       canActivate: [adminGuard], loadComponent: () => import('./pages/product-form/product-form').then(m => m.ProductForm) },
      { path: 'products/edit/:id',  canActivate: [adminGuard], loadComponent: () => import('./pages/product-form/product-form').then(m => m.ProductForm) },
    ]
  },

  { path: '**', redirectTo: '' }
];