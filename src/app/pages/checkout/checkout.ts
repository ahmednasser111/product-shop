import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { KeyValuePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, RouterLink, KeyValuePipe, CurrencyPipe],
  templateUrl: './checkout.html',
})
export class Checkout {
  // Mock data for price lookups (In ITI projects, this usually comes from a Service)
  productsData: { [key: string]: { name: string; price: number } } = {
    id1: { name: 'Wireless Mouse', price: 250 },
    id2: { name: 'Mechanical Keyboard', price: 1200 },
    id3: { name: 'Gaming Monitor', price: 4500 },
  };

  cartList: { [key: string]: number }[] = [{ id1: 2 }, { id2: 5 }, { id3: 1 }];

  // Calculate total price using reduce
  get totalPrice(): number {
    return this.cartList.reduce((sum, itemObj) => {
      const id = Object.keys(itemObj)[0];
      const qty = itemObj[id];
      const price = this.productsData[id]?.price || 0;
      return sum + price * qty;
    }, 0);
  }

  getProductName(id: string): string {
    return this.productsData[id]?.name || 'Unknown Product';
  }

  getProductPrice(id: string): number {
    return this.productsData[id]?.price || 0;
  }
}
