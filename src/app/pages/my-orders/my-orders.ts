import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Payment } from '../../services/payment';
import { ShoppingCartService } from '../../services/shopping-cart-service';
import { IPayment } from '../../models/ipayment';
import { Cart } from '../../models/order';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css',
})
export class MyOrders implements OnInit {
  private paymentService = inject(Payment);
  private shoppingCartService = inject(ShoppingCartService);

  paymentHistory = signal<IPayment[]>([]);
  currentOrder = this.shoppingCartService.userCartJoined;

  async ngOnInit() {
    try {
      const response = await this.paymentService.getPaymentHistory();
      this.paymentHistory.set(response.payments);
    } catch (error) {
      console.error('Failed to fetch payment history:', error);
    }
  }

  calculateTotal(payment: IPayment): number {
    return payment.totalPrice || 0;
  }
}
