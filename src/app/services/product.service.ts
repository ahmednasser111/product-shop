import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product.model';
import { map } from 'rxjs/operators';
import { UserAuth } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private auth = inject(UserAuth);
  private baseUrl = environment.apiUrl;

  getAll = (): Observable<IProduct[]> =>
    this.http
      .get<{ message: string; products: IProduct[]; filters?: any }>(`${this.baseUrl}/products`)
      .pipe(map((res) => res.products));

  getBySeller = (id: string): Observable<IProduct[]> =>
    this.http.get<any>(`${this.baseUrl}/products/seller/${id}`).pipe(
      map((data) =>
        data.products.map((pr: any) => {
          return {
            ...pr,
            id: pr._id,
          } as IProduct;
        }),
      ),
    );

  getById = (id: string): Observable<IProduct> =>
    this.http
      .get<{ product: IProduct }>(`${this.baseUrl}/products/${id}`)
      .pipe(map((res) => res.product));

  getAllCategories = (): Observable<string[]> =>
    this.http
      .get<IProduct[]>(`${this.baseUrl}/products`)
      .pipe(map((products) => [...new Set(products.map((p) => p.category))]));

  post = (product: Omit<IProduct, 'id'>): Observable<IProduct> =>
    new Observable<IProduct>((observer) => {
      this.auth.getToken().then((token) => {
        // console.log(token);
        this.http
          .post<IProduct>(`${this.baseUrl}/products`, product, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
          .subscribe(observer);
      });
    });

  delete = (id: string): Observable<void> =>
    new Observable<void>((observer) => {
      this.auth.getToken().then((token) => {
        this.http
          .delete<void>(`${this.baseUrl}/products/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
          .subscribe(observer);
      });
    });

  update = (id: string, product: Omit<IProduct, 'id'>): Observable<IProduct> =>
    new Observable<IProduct>((observer) => {
      this.auth.getToken().then((token) => {
        this.http
          .put<IProduct>(`${this.baseUrl}/products/${id}`, product, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
          .subscribe();
      });
    });
}
