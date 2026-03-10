import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { KeyValuePipe, CurrencyPipe } from '@angular/common';
import { ShoppingCartService } from '../../services/shopping-cart-service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, RouterLink, KeyValuePipe, CurrencyPipe],
  templateUrl: './checkout.html',
})
export class Checkout {
  // Mock data for price lookups (In ITI projects, this usually comes from a Service)
  // productsData: { [key: string]: { name: string; price: number } } = {
  //   id1: { name: 'Wireless Mouse', price: 250 },
  //   id2: { name: 'Mechanical Keyboard', price: 1200 },
  //   id3: { name: 'Gaming Monitor', price: 4500 },
  // };

  // cartList: { [key: string]: number }[] = [{ id1: 2 }, { id2: 5 }, { id3: 1 }];

  private shoppingCartService = inject(ShoppingCartService);
  cartJoined = this.shoppingCartService.userCartJoined;

  // Calculate total price using reduce
  get totalPrice(): number {
    let sum = 0;
    this.cartJoined().order.prdQtyList.map(
      (prd) => (sum += prd.productDetails!.price * prd.quantity),
    );
    // return this.cartList.reduce((sum, itemObj) => {
    //   const id = Object.keys(itemObj)[0];
    //   const qty = itemObj[id];
    //   const price = this.productsData[id]?.price || 0;
    //   return sum + price * qty;
    // }, 0);
    return sum;
  }

  // getProductName(id: string): string {
  //   return this.productsData[id]?.name || 'Unknown Product';
  // }

  // getProductPrice(id: string): number {
  //   return this.productsData[id]?.price || 0;
  // }
}
