import { Injectable, OnInit, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { any } from '../models/product.model';
import { map, retry } from 'rxjs/operators';
import { UserAuth } from './auth.service';
import { environment } from '../../environments/environment';
import { Token } from '@angular/compiler';
import { log } from 'firebase/firestore/pipelines';
import { Cart, prdQty } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService implements OnInit {
  private http = inject(HttpClient);
  private auth = inject(UserAuth);
  private baseUrl = environment.apiUrl;
  userCart = signal<Cart>({} as Cart);
  userCartJoined = signal<Cart>({} as Cart);
  // userCartJoined = computed(() => {
  //   this.getByUsrIdJoined(this.auth.getId()).subscribe({ next: (data) => data });
  // });

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

  ngOnInit(): void {}
  post = (usrId: string | null, prdQtyList: prdQty[]): Observable<Cart> =>
    new Observable<Cart>((observer) => {
      this.auth.getToken().then((token) => {
        console.log(token);
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
