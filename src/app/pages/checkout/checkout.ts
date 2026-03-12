import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ShoppingCartService } from '../../services/shopping-cart-service';
import { loadScript } from '@paypal/paypal-js';
import { Payment } from '../../services/payment';
import { IPayment } from '../../models/ipayment';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, RouterLink, CurrencyPipe],
  templateUrl: './checkout.html',
})
export class Checkout implements OnInit {
  async ngOnInit(): Promise<void> {
    // throw new Error('Method not implemented.');
    await this.initPaypal();
  }
  private paymentService = inject(Payment);
  // private shService = inject(ShoppingCartService);
  payment: IPayment = {} as IPayment;
  method = signal<string>('');

  private shoppingCartService = inject(ShoppingCartService);
  cartJoined = this.shoppingCartService.userCartJoined;

  get totalPrice(): number {
    let sum = 0;
    this.cartJoined().order.prdQtyList.map(
      (prd) => (sum += prd.productDetails!.price * prd.quantity),
    );

    return sum;
  }

  async initPaypal() {
    try {
      const paypal = await loadScript({
        clientId:
          'AYeRn-POdWCxUHkMhy65kVnm39PUAVM9XrcjTyheOOpf-6Nv0iTMuw2FNTJd-nuAKxYaqQFH5-Z60gI1',
      });

      if (paypal && paypal.Buttons) {
        await paypal
          .Buttons({
            createOrder: async (data) => {
              console.log({ data });
              const response = await this.paymentService.initPayment(data);
              this.payment = response.payment;
              return response.id;
            },

            onApprove: async (data: any) => {
              const orderId = data.orderID;
              console.log({ data });

              this.paymentService.confirmPayment(this.payment.transactionId, orderId, 'done');
            },
            onError: (err) => {
              // this.paymentService.confirmPayment(this.payment.transactionId, 'failed');
              console.error('PayPal Error:', err);
            },
          })
          .render('#paypal-button-container');
      }
    } catch (error) {
      console.error('Failed to load the PayPal SDK', error);
    }
  }

  async initCashOnDelivery() {
    const response = await this.paymentService.initPayment({ paymentSource: 'Cash On Delivery' });
    console.log({ response });
  }

  async togglePaypal() {
    this.method.set(this.method() === 'paypal' ? '' : 'paypal');
    // await this.initPaypal();
  }
}
