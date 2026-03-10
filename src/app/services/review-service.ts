import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Review } from '../models/review';
import { UserAuth } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private http = inject(HttpClient);
  private api = 'http://localhost:3000/reviews';
  private auth = inject(UserAuth);

  getByProduct(productId: string) {
    return this.http.get<Review[]>(`${this.api}/product/${productId}`);
  }

  async create(rating: number | undefined, comment: string | undefined, productId: string) {
    const token = await this.auth.getToken();
    return this.http.post<Review>(
      this.api,
      { rating, comment, productId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}
