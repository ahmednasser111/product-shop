import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD24NNye4udWtxLQALNSoWdvxDXhsKsmqc',
  authDomain: 'product-shop-f6329.firebaseapp.com',
  projectId: 'product-shop-f6329',
  storageBucket: 'product-shop-f6329.firebasestorage.app',
  messagingSenderId: '704334222718',
  appId: '1:704334222718:web:8edab471b81a6bb9268f2f',
};

initializeApp(firebaseConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
  ],
};
