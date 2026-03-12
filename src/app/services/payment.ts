import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserAuth } from './auth.service';
import { lastValueFrom } from 'rxjs';
import { IPayment } from '../models/ipayment';
import { ShoppingCartService } from './shopping-cart-service';

@Injectable({
  providedIn: 'root',
})
export class Payment {
  private http = inject(HttpClient);
  private auth = inject(UserAuth);
  private shoppingCartService = inject(ShoppingCartService);
  private baseUrl = environment.apiUrl;

  initPayment = async (data: any): Promise<{ id: string; payment: IPayment }> => {
    const body = {
      userId: this.auth.getId(),
      paymentMethod: data.paymentSource,
    };
    const token = await this.auth.getToken();
    const response = await lastValueFrom(
      this.http.post<{ id: string; payment: IPayment }>(
        `${this.baseUrl}/payments/paypal/initate-payment`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ),
    );
    return response;
  };
  confirmPayment = async (
    transactionId: string,
    orderId: string,
    status: 'pending' | 'done' | 'failed',
  ): Promise<{ payment: IPayment }> => {
    const body = {
      transactionId,
      orderId,
      status,
    };
    const token = await this.auth.getToken();
    const response = await lastValueFrom(
      this.http.post<{ payment: IPayment }>(
        `${this.baseUrl}/payments/paypal/confirm-payment`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ),
    );
    this.shoppingCartService.refreshCarts();
    return response;
  };

  confirmPaymentCash = async (
    transactionId: string,
    status: 'pending' | 'done' | 'failed',
  ): Promise<{ payment: IPayment }> => {
    const body = {
      transactionId,
      status,
    };
    const token = await this.auth.getToken();
    const response = await lastValueFrom(
      this.http.post<{ payment: IPayment }>(
        `${this.baseUrl}/payments/paypal/confirm-payment`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ),
    );
    this.shoppingCartService.refreshCarts();
    return response;
  };
}
