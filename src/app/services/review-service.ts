import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Review } from '../models/review';
import { UserAuth } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private http = inject(HttpClient);
  private api = 'http://localhost:3000/reviews';
  private auth = inject(UserAuth);

  getByProduct(productId: string): Observable<any> {
    return this.http.get<any>(`${this.api}/product/${productId}`);
  }

  async postReview(
    productId: string,
    rating: number | undefined,
    comment: string | undefined,
  ): Promise<Observable<any>> {
    const token = await this.auth.getToken();
    return this.http.post(
      this.api,
      { rating: rating, comment: comment, productId: productId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  async getByUser(): Promise<Observable<any> | null> {
    const user = this.auth.getUser();
    if (!user) {
      return null;
    }
    const token = await this.auth.getToken();
    return this.http.get(`${this.api}/user/${user._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
