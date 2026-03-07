import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IProduct } from '../models/product.model';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private http    = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getAll = (): Observable<IProduct[]> =>
    this.http.get<IProduct[]>(`${this.apiUrl}/products`);

  getById = (id: number): Observable<IProduct> =>
    this.http.get<IProduct>(`${this.apiUrl}/products/${id}`);

  getAllCategories = (): Observable<string[]> =>
    this.http.get<IProduct[]>(`${this.apiUrl}/products`).pipe(
      map(products => [...new Set(products.map(p => p.category))])
  );

  post = (product: Omit<IProduct, 'id'>): Observable<IProduct> =>
    this.http.post<IProduct>(`${this.apiUrl}/products`, product);

  delete = (id: number): Observable<void> =>
    this.http.delete<void>(`${this.apiUrl}/products/${id}`);

  update = (id: number, product: Omit<IProduct, 'id'>): Observable<IProduct> =>
    this.http.put<IProduct>(`${this.apiUrl}/products/${id}`, product);

}