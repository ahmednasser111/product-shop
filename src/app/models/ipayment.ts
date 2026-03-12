import { Type } from '@angular/core';
import { prdQty } from './order';

export interface IPayment {
  userId: string;
  paymentMethod: 'paypal' | 'Cash On Delivery';
  paymentStatus: 'pending' | 'done' | 'failed';
  productList: prdQty[];
  transactionId: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}
