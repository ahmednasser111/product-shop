import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserAuth } from '../../services/auth.service';
import { ShoppingCartService } from '../../services/shopping-cart-service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './shopping-cart.html',
})
export class ShoppingCart {
  private authService = inject(UserAuth);
  private shCrtService = inject(ShoppingCartService);

  usrId: string | null = this.authService.getId();
  // cart = this.shCrtService.userCart;
  cartJoined = this.shCrtService.userCartJoined;

  updateQuantity(index: number, productId: string | number, newQuantity: number) {
    console.log({ index, productId, newQuantity });
    this.cartJoined().order.prdQtyList[index].quantity = newQuantity;
    this.shCrtService.getByUsrIdJoined(this.authService.getId()).subscribe({
      next: (data) => {
        console.log({ joinedData: data });
      },
    });

    console.log({ cart: this.cartJoined() });

    if (newQuantity < 1) {
      this.cartJoined().order.prdQtyList.splice(index, 1);
    }
    this.shCrtService
      .update(this.authService.getId(), this.cartJoined().order.prdQtyList)
      .subscribe({
        next: (ret) => {
          console.log({ ret });
        },
      });
  }
  removeFromCart(index: number) {
    this.cartJoined().order.prdQtyList.splice(index, 1);
    // this.cartJoined().order.prdQtyList.splice(index, 1);
    this.shCrtService
      .update(this.authService.getId(), this.cartJoined().order.prdQtyList)
      .subscribe({
        next: (ret) => {
          console.log({ ret });
        },
      });
  }
}
