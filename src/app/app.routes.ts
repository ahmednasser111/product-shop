import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
    {
        path: '',
        component: MainLayout,
        children: [
            {
                path: '',
                data: { preload: true },
                loadComponent: () =>
                    import('./pages/home/home').then(m => m.Home)
            },
            {
                path: 'products',
                data: { preload: true },
                loadComponent: () =>
                    import('./pages/products/products').then(m => m.Products)
            },
            {
                path: 'product/:id',
                loadComponent: () =>
                    import('./pages/product/product').then(m => m.Product)
            },
            {
                path: 'products/add',
                loadComponent: () =>
                    import('./pages/product-form/product-form').then(m => m.ProductForm)
            },
            {
                path: 'products/edit/:id',
                loadComponent: () =>
                    import('./pages/product-form/product-form').then(m => m.ProductForm)
            },
            {
                path: 'about',
                loadComponent: () =>
                    import('./pages/about/about').then(m => m.About)
            },
        ]
    },
    {
        path: '',
        component: AuthLayout,
        children: [
            {
                path: 'login',
                loadComponent: () =>
                import('./pages/login/login').then(m => m.Login)
            },
            {
                path: 'register',
                loadComponent: () =>
                import('./pages/register/register').then(m => m.Register)
            },
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];