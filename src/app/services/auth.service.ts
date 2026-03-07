import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IUser, Role } from '../models/user.model';
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
  sendEmailVerification,
  signInWithPopup,
} from 'firebase/auth';

@Injectable({ providedIn: 'root' })
export class UserAuth {
  private http = inject(HttpClient);
  private url = `${API}/users`;
  private apiUrl = `http://localhost:3000`;
  private user: IUser | null = null;

  constructor() {}

  getUser(): IUser | null {
    return this.user;
  }

  isLogged = (): Observable<boolean> => {
    return new Observable<boolean>((subscriber) => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(
        auth,
        async (user) => {
          if (user) {
            this.user = await this.getUserById(user.uid);
          }
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
  isAdmin = (): boolean => this.getUser()?.role === 'admin';

  sendVerificationEmail(): Observable<void> {
    return new Observable<void>((subscriber) => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        sendEmailVerification(user)
          .then(() => {
            subscriber.next();
            subscriber.complete();
          })
          .catch((error) => {
            subscriber.error(error);
          });
      }
    });
  }

  signInWithGoogle(): Observable<IUser | null> {
    return new Observable<IUser | null>((subscriber) => {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then(async (result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const firebaseUser = result.user;
          const user = await this.createUser(
            firebaseUser.uid,
            firebaseUser.displayName ?? '-',
            firebaseUser.email ?? '-',
          );
          if (user) {
            this.user = user;
            subscriber.next(user);
          } else {
            subscriber.error('user not created');
          }
          // subscriber.next({
          //   id: 1,
          //   name: firebaseUser.displayName ?? '-',
          //   email: firebaseUser.email ?? '-',
          //   password: '',
          //   role: 'user',
          // });
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
              isVerified: userCredential.user?.emailVerified ?? false,
            };
            this.user = user;
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

  register(name: string, email: string, password: string, role: Role): Observable<IUser> {
    const userObservable = new Observable<IUser>((subscriber) => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          this.createUser(userCredential.user?.uid ?? '', name, email);
          const user: IUser = {
            id: 1,
            name: name,
            email: email,
            password: '',
            role: role,
            isVerified: userCredential.user?.emailVerified ?? false,
          };
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

  async createUser(id: string, name: string, email: string): Promise<IUser | null> {
    const res = await fetch(`${this.apiUrl}/create_user`, {
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
    if (res.status === 200) {
      return res.json();
    }
    return null;
  }

  async getUserById(id: string): Promise<IUser | null> {
    const res = await fetch(`${this.apiUrl}/user/${id}`);
    if (res.status === 200) {
      return res.json();
    }
    return null;
  }
}
