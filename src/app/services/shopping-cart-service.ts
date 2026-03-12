import { Injectable, OnInit, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map, retry } from 'rxjs/operators';
import { UserAuth } from './auth.service';
import { environment } from '../../environments/environment';
import { Token } from '@angular/compiler';
import { log } from 'firebase/firestore/pipelines';
import { Cart, prdQty } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private http = inject(HttpClient);
  private auth = inject(UserAuth);
  private baseUrl = environment.apiUrl;
  userCart = signal<Cart>({} as Cart);
  userCartJoined = signal<Cart>({} as Cart);

  constructor() {
    this.getByUsrId(this.auth.getId()).subscribe({
      next: (data) => {
        this.userCart.set(data);
      },
    });
    this.getByUsrIdJoined(this.auth.getId()).subscribe({
      next: (data) => {
        this.userCartJoined.set(data);
      },
    });
  }

  refreshCarts = () => {
    console.log('refreshing carts...');

    this.getByUsrId(this.auth.getId()).subscribe({
      next: (data) => {
        this.userCart.set(data);
        // Log here to see the real data!
        console.log('User Cart updated:', data);
      },
    });

    this.getByUsrIdJoined(this.auth.getId()).subscribe({
      next: (data) => {
        this.userCartJoined.set(data);
        console.log('User Cart Joined updated:', data);
      },
    });
  };

  getByUsrId = (usrId: string | null): Observable<Cart> =>
    new Observable<Cart>((observer) => {
      this.auth.getToken().then((token) => {
        this.http
          .get<Cart>(`${this.baseUrl}/orders/${usrId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .subscribe(observer);
      });
    });

  getByUsrIdJoined = (usrId: string | null): Observable<Cart> =>
    new Observable<Cart>((observer) => {
      this.auth.getToken().then((token) => {
        this.http
          .get<Cart>(`${this.baseUrl}/orders/joined/${usrId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .subscribe(observer);
      });
    });

  post = (usrId: string | null, prdQtyList: prdQty[]): Observable<Cart> => {
    return new Observable<Cart>((observer) => {
      this.auth.getToken().then((token) => {
        this.http
          .post<Cart>(
            `${this.baseUrl}/orders`,
            { usrId, prdQtyList },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .subscribe(observer);
      });
    });
  };
  update = (usrId: string | null, prdQtyList: prdQty[]): Observable<Cart> =>
    new Observable<Cart>((observer) => {
      this.auth.getToken().then((token) => {
        console.log({ prdQtyList });

        this.http
          .put<Cart>(
            `${this.baseUrl}/orders`,
            { usrId, prdQtyList },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .subscribe(observer);
      });
    });
}
