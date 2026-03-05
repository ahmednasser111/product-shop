import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { IUser } from '../models/user.model';
import { API } from '../../api/api';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  setPersistence,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';

@Injectable({ providedIn: 'root' })
export class UserAuth {
  private http = inject(HttpClient);
  private url = `${API}/users`;
  private apiUrl = `http://localhost:3000`;

  constructor() {}

  getUser(): IUser | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLogged = (): Observable<boolean> => {
    return new Observable<boolean>((subscriber) => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          subscriber.next(!!user);
          subscriber.complete();
        },
        (error) => {
          subscriber.error(error);
        },
      );
      return () => unsubscribe();
    });
  };
  // isLogged = (): boolean => !!this.getUser();
  // isAuth = (): boolean => this.isLogged();
  isAdmin = (): boolean => this.getUser()?.role === 'admin';

  signInWithGoogle(): Observable<IUser | null> {
    return new Observable<IUser | null>((subscriber) => {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const user = result.user;
          this.createUser(user.uid, user.displayName ?? '-', user.email ?? '-');
          subscriber.next({
            id: 1,
            name: user.displayName ?? '-',
            email: user.email ?? '-',
            password: '',
            role: 'user',
          });
          subscriber.complete();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
          subscriber.error(error);
        });
    });
  }

  login(email: string, password: string): Observable<IUser> {
    const auth = getAuth();

    return new Observable<IUser>((subscriber) => {
      try {
        setPersistence(auth, browserLocalPersistence).then(async () => {
          try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user: IUser = {
              id: 1,
              name: userCredential.user?.displayName ?? '-',
              email,
              password,
              role: 'user',
            };

            subscriber.next(user);
            subscriber.complete();

            console.log(auth.currentUser);
          } catch (error) {
            subscriber.error(error);
          }
        });
      } catch (error) {
        subscriber.error(error);
      }
    });
  }

  register(name: string, email: string, password: string): Observable<IUser> {
    const userObservable = new Observable<IUser>((subscriber) => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          this.createUser(userCredential.user?.uid ?? '', name, email);
          const user: IUser = { id: 1, name: name, email: email, password: '', role: 'user' };
          subscriber.next(user);
          subscriber.complete();
        })
        .catch((error) => {
          console.error(error);
        });
    });
    return userObservable;
  }

  async logout(): Promise<void> {
    await signOut(getAuth());
  }

  async createUser(id: string, name: string, email: string) {
    fetch(`${this.apiUrl}/create_user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        name,
        email,
      }),
    });
  }
}
