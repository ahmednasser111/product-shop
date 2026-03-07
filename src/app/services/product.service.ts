import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IProduct } from '../models/product.model';
import { map } from 'rxjs/operators';
import { UserAuth } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private auth = inject(UserAuth);
  // private baseUrl = API;
  private baseUrl = 'http://localhost:3000';

  getAll = (): Observable<IProduct[]> => this.http.get<IProduct[]>(`${this.baseUrl}/products`);

  getById = (id: number): Observable<IProduct> =>
    this.http.get<IProduct>(`${this.baseUrl}/products/${id}`);

  getAllCategories = (): Observable<string[]> =>
    this.http
      .get<IProduct[]>(`${this.baseUrl}/products`)
      .pipe(map((products) => [...new Set(products.map((p) => p.category))]));

  post = (product: Omit<IProduct, 'id'>): Observable<IProduct> =>
    new Observable<IProduct>((observer) => {
      this.auth.getToken().then((token) => {
        // console.log(token);
        this.http
          .put<IProduct>(`${this.baseUrl}/products`, product, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
          .subscribe(observer);
      });
    });

  delete = (id: number): Observable<void> =>
    this.http.delete<void>(`${this.baseUrl}/products/${id}`);

  update = (id: number, product: Omit<IProduct, 'id'>): Observable<IProduct> =>
    this.http.put<IProduct>(`${this.baseUrl}/products/${id}`, product);
}
