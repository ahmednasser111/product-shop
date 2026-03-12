import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Payment } from '../../services/payment';
import { IPayment } from '../../models/ipayment';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-orders.html',
  styleUrl: './admin-orders.css',
})
export class AdminOrders implements OnInit {
  private paymentService = inject(Payment);

  allPayments = signal<IPayment[]>([]);
  isLoading = signal<boolean>(true);

  async ngOnInit() {
    await this.fetchPayments();
  }

  async fetchPayments() {
    this.isLoading.set(true);
    try {
      const response = await this.paymentService.getAllPayments();
      console.log(response);
      // Ensure we have an array
      this.allPayments.set(response.payments || []);
    } catch (error) {
      console.error('Failed to fetch all payments:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  calculateTotal(payment: IPayment): number {
    return payment.totalPrice || 0;
  }

  async updatePaymentStatus(transactionId: string, status: 'pending' | 'done' | 'failed') {
    try {
      await this.paymentService.confirmPaymentCash(transactionId, status);
      await this.fetchPayments(); // Refresh list after update
    } catch (error) {
      console.error('Failed to update payment status:', error);
      alert('Failed to update payment status');
    }
  }
}
