import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
  private router = inject(Router);
  private shCrtService = inject(ShoppingCartService);

  usrId: string | null = this.authService.getId();

  cartJoined = this.shCrtService.userCartJoined;

  updateQuantity(index: number) {
    const stock = this.cartJoined().order.prdQtyList[index].productDetails!.stock;
    let prdQtyList = this.cartJoined().order.prdQtyList[index];
    if (prdQtyList.quantity > stock) prdQtyList.quantity = stock;
    if (prdQtyList.quantity < 1) {
      // this.cartJoined().order.prdQtyList.splice(index, 1);
      prdQtyList.quantity = 1;
    }
    this.shCrtService
      .update(this.authService.getId(), this.cartJoined().order.prdQtyList)
      .subscribe({
        next: (ret) => {
          console.log({ ret });
        },
      });
  }
  prdDetails(id: string) {
    this.router.navigate(['/product', id]);
  }
  removeFromCart(index: number) {
    this.cartJoined().order.prdQtyList.splice(index, 1);
    this.shCrtService
      .update(this.authService.getId(), this.cartJoined().order.prdQtyList)
      .subscribe({
        next: (ret) => {
          console.log({ ret });
        },
      });
  }
}
