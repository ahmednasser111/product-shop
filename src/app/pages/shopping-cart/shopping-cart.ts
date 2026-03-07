import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { JsonPipe, KeyValuePipe } from '@angular/common';
import { JsonpInterceptor } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product.model';
import { UserAuth } from '../../services/auth.service';
import { ShoppingCartService } from '../../services/shopping-cart-service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [KeyValuePipe, JsonPipe, FormsModule, RouterLink],
  templateUrl: './shopping-cart.html',
})
export class ShoppingCart implements OnInit, OnChanges {
  // private productService = inject(ProductService);
  private authService = inject(UserAuth);
  private shCrtService = inject(ShoppingCartService);

  cartList: { [key: string]: number }[] = [{ id1: 2 }, { id2: 5 }, { id3: 500 }];
  usrId: string | null = '';
  cart: any;
  // prdList: IProduct[] = [];
  ngOnInit(): void {
    this.usrId = this.authService.getId();
    this.cart = this.shCrtService.getByUsrId(this.usrId).subscribe({
      next: (data) => {
        console.log({ data });
      },
    });
    // this.productService.getAll().subscribe({
    //   next: (products) => {
    //     this.prdList = products;
    //     console.log({ list: this.prdList });
    //   },
    //   error: () => {},
    // });
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log({ changes });
  }
  clicked() {
    console.log({ list: this.cartList });
  }
  updateQuantity(index: number, productId: string | number, newQuantity: number) {
    console.log({ index, productId, newQuantity });

    if (newQuantity < 1) {
      this.cartList.splice(index, 1);

      console.log('Item removed. New list:', this.cartList);

      return;
    }

    if (this.cartList[index]) {
      this.cartList[index][productId] = newQuantity;
      console.log('Updated cartList:', this.cartList);
    }
  }
}
