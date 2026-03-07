import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { JsonPipe, KeyValuePipe } from '@angular/common'; // Import this
import { JsonpInterceptor } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [KeyValuePipe, JsonPipe, FormsModule, RouterLink], // Add to imports
  templateUrl: './shopping-cart.html',
})
export class ShoppingCart implements OnInit, OnChanges {
  // Your specific structure: [{ id: qty }]
  cartList: { [key: string]: number }[] = [{ id1: 2 }, { id2: 5 }, { id3: 500 }];
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log({ changes });
  }
  clicked() {
    console.log({ list: this.cartList });
  }
  updateQuantity(index: number, productId: string | number, newQuantity: number) {
    console.log({ index, productId, newQuantity });

    // CASE 1: Remove item if quantity drops below 1
    if (newQuantity < 1) {
      // splice(start, deleteCount) removes the item and shifts the rest of the array
      this.cartList.splice(index, 1);

      console.log('Item removed. New list:', this.cartList);
      // Sync with storage if needed: this.saveToLocalStorage();
      return;
    }

    // CASE 2: Update the source of truth
    // We use bracket notation to access the dynamic product ID key
    if (this.cartList[index]) {
      this.cartList[index][productId] = newQuantity;
      console.log('Updated cartList:', this.cartList);
    }
  }
}
