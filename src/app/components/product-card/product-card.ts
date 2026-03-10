import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { IProduct } from '../../models/product.model';
import { TruncatePipe } from '../../pipes/truncate-pipe';
import { BuyButton } from '../buy-button/buy-button';
import { CardShadowDirective } from '../../directives/card-shadow';
import { ZoomImageDirective } from '../../directives/zoom-image';
import { UserAuth } from '../../services/auth.service';

@Component({
  selector: 'app-product-card',
  imports: [TruncatePipe, BuyButton, CardShadowDirective, ZoomImageDirective],
  templateUrl: './product-card.html',
})
export class ProductCard {
  protected auth = inject(UserAuth);

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

  toggleDetails() {
    this.details = !this.details;
  }

  onBuy = () => {
    alert(`You bought ${this.product.name}`);
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
