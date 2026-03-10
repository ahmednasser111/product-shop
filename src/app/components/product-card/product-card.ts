import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { IProduct } from '../../models/product.model';
import { TruncatePipe } from '../../pipes/truncate-pipe';
import { BuyButton } from '../buy-button/buy-button';
import { CardShadowDirective } from '../../directives/card-shadow';
import { ZoomImageDirective } from '../../directives/zoom-image';
import { UserAuth } from '../../services/auth.service';
import { ShoppingCartService } from '../../services/shopping-cart-service';
import { log } from 'firebase/firestore/lite/pipelines';
import { log10 } from 'firebase/firestore/pipelines';

@Component({
  selector: 'app-product-card',
  imports: [TruncatePipe, BuyButton, CardShadowDirective, ZoomImageDirective],
  templateUrl: './product-card.html',
})
export class ProductCard implements OnInit {
  protected auth = inject(UserAuth);
  private shoppingCartService = inject(ShoppingCartService);
  cartJoined = this.shoppingCartService.userCartJoined;
  @Input() product: IProduct = {
    id: '',
    name: '',
    description: '',
    price: 0,
    rating: 0,
    category: '',
    image: '',
    stock: 0,
    sellerId: '',
    createdAt: '',
    updatedAt: '',
  };
  details: boolean = false;
  @Output() clickedProductId = new EventEmitter<string>();
  @Output() editProductId = new EventEmitter<string>();
  @Output() deleteProductId = new EventEmitter<string>();

  ngOnInit(): void {}
  toggleDetails() {
    this.details = !this.details;
  }

  onBuy = () => {
    console.log({
      usrCart: this.cartJoined(),
      prdId: this.product._id,
      usrId: this.auth.getId(),
    });

    if (this.cartJoined().order) {
      const prdQtyList = this.cartJoined().order.prdQtyList;
      const prdQtyy = prdQtyList.findIndex((prd) => prd.prdId == this.product._id);
      console.log({ prdQtyy });

      if (prdQtyy !== -1) {
        console.log('inside If');

        // prdQtyList[prdQtyy].quantity += 1;
        prdQtyList[prdQtyy].quantity +=
          prdQtyList[prdQtyy].quantity >= prdQtyList[prdQtyy].productDetails!.stock
            ? prdQtyList[prdQtyy].productDetails!.stock - prdQtyList[prdQtyy].quantity
            : 1;
      } else {
        prdQtyList.push({ prdId: this.product._id!, quantity: 1 });
      }

      console.log({ prdQtyList });

      this.shoppingCartService.update(this.auth.getId(), prdQtyList).subscribe({
        next: (data) => {
          console.log({ data });
          this.cartJoined.set(data);
        },
      });
    } else {
      this.shoppingCartService
        .post(this.auth.getId(), [{ prdId: this.product._id!, quantity: 1 }])
        .subscribe({
          next: (ret) => {
            console.log({ ret });
            this.cartJoined.set(ret);
            console.log({ usrCart: this.cartJoined() });
          },
        });
    }

    console.log(this.product);
  };

  onClick = () => {
    this.clickedProductId.emit(this.product.id);
  };
  onDelete = (event: MouseEvent) => {
    event.stopPropagation();
    this.deleteProductId.emit(this.product.id);
  };
  onEdit = (event: MouseEvent) => {
    event.stopPropagation();
    this.editProductId.emit(this.product.id);
  };
}
