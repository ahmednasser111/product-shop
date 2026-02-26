import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { IUser } from '../models/user.model';
import { API } from '../../api/api';

@Injectable({ providedIn: 'root' })
export class UserAuth {

  private http    = inject(HttpClient);
  private url     = `${API}/users`;

  getUser(): IUser | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLogged  = (): boolean => !!this.getUser();
  isAdmin   = (): boolean => this.getUser()?.role === 'admin';

  LogIn(email: string, password: string): Observable<IUser> {
    return this.http
      .get<IUser[]>(`${this.url}?email=${email}&password=${password}`)
      .pipe(
        map(users => {
          if (!users.length) throw new Error('Invalid credentials');
          return users[0];
        }),
        tap(user => localStorage.setItem('user', JSON.stringify(user)))
      );
  }

  Register(name: string, email: string, password: string): Observable<IUser> {
    return this.http
      .post<IUser>(this.url, { name, email, password, role: 'user' })
      .pipe(
        tap(user => localStorage.setItem('user', JSON.stringify(user)))
      );
  }

  LogOut(): void {
    localStorage.removeItem('user');
  }
}