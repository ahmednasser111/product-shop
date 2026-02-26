import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IProduct } from '../models/product.model';
import { API } from '../../api/api';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private http    = inject(HttpClient);
  private baseUrl = API;

  getAll = (): Observable<IProduct[]> =>
    this.http.get<IProduct[]>(`${this.baseUrl}/products`);

  getById = (id: number): Observable<IProduct> =>
    this.http.get<IProduct>(`${this.baseUrl}/products/${id}`);

  getAllCategories = (): Observable<string[]> =>
    this.http.get<IProduct[]>(`${this.baseUrl}/products`).pipe(
      map(products => [...new Set(products.map(p => p.category))])
  );

  post = (product: Omit<IProduct, 'id'>): Observable<IProduct> =>
    this.http.post<IProduct>(`${this.baseUrl}/products`, product);

  delete = (id: number): Observable<void> =>
    this.http.delete<void>(`${this.baseUrl}/products/${id}`);

  update = (id: number, product: Omit<IProduct, 'id'>): Observable<IProduct> =>
    this.http.put<IProduct>(`${this.baseUrl}/products/${id}`, product);

}