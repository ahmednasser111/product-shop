import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuth } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    private http: HttpClient,
    private auth: UserAuth,
  ) {}
  getAll(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/categories');
  }

  async createCategory(name: string): Promise<Observable<any>> {
    const token = await this.auth.getToken();
    return this.http.post<any>(
      'http://localhost:3000/categories',
      { name: name },
      { headers: { Authorization: `Bearer ${token}` } },
    );
  }
  async updateCategory(id: string, name: string): Promise<Observable<any>> {
    const token = await this.auth.getToken();
    return this.http.put<any>(
      `http://localhost:3000/categories/${id}`,
      { name: name },
      { headers: { Authorization: `Bearer ${token}` } },
    );
  }

  async deleteCategory(id: string): Promise<Observable<any>> {
    const token = await this.auth.getToken();
    return this.http.delete<any>('http://localhost:3000/categories/' + id, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  }
}
