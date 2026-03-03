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
  onAuthStateChanged,
} from 'firebase/auth';

@Injectable({ providedIn: 'root' })
export class UserAuth {
  private http = inject(HttpClient);
  private url = `${API}/users`;

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

  login(email: string, password: string): Observable<IUser> {
    const auth = getAuth();

    return new Observable<IUser>((subscriber) => {
      setPersistence(auth, browserLocalPersistence)
        .then(() => {
          return signInWithEmailAndPassword(auth, email, password);
        })
        .then((userCredential) => {
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
        })
        .catch((error) => {
          console.error(error);
          subscriber.error(error);
        });
    });
  }

  register(name: string, email: string, password: string): Observable<IUser> {
    const userObservable = new Observable<IUser>((subscriber) => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user: IUser = { id: 1, name, email, password, role: 'user' };
          subscriber.next(user);
        })
        .catch((error) => {
          console.error(error);
        });
    });
    return userObservable;
  }

  logout(): void {
    signOut(getAuth());
  }
}
