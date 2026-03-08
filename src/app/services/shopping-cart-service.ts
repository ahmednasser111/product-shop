import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { any } from '../models/product.model';
import { map } from 'rxjs/operators';
import { UserAuth } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private http = inject(HttpClient);
  private auth = inject(UserAuth);
  private baseUrl = environment.apiUrl;

  getByUsrId = (usrId: string | null): Observable<any> =>
    new Observable<any>((observer) => {
      this.auth.getToken().then((token) => {
        this.http
          .get<any>(`${this.baseUrl}/orders/${usrId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .subscribe(observer);
      });
    });

  post = (usrId: string | null, prdQtyList: any): Observable<any> =>
    new Observable<any>((observer) => {
      this.auth.getToken().then((token) => {
        console.log(token);
        this.http
          .post<any>(
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

  update = (usrId: string | null, prdQtyList: any): Observable<any> =>
    this.http.put<any>(`${this.baseUrl}/orders/${usrId}`, prdQtyList);
}
