import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../models/product.model';
import { TruncatePipe } from '../../pipes/truncate-pipe';
import { BuyButton } from '../buy-button/buy-button';
import { CardShadowDirective } from '../../directives/card-shadow';
import { ZoomImageDirective } from '../../directives/zoom-image';

@Component({
  selector: 'app-product-card',
  imports: [TruncatePipe, BuyButton, CardShadowDirective, ZoomImageDirective],
  templateUrl: './product-card.html',
})
export class ProductCard {
  @Input() product: IProduct = {id: 0, name: '', description: '', price: 0, rating: 0, category: '', image: ''} ;
  details : boolean = false;
  @Output() clickedProductId = new EventEmitter<number>();
  @Output() editProductId = new EventEmitter<number>();
  @Output() deleteProductId = new EventEmitter<number>();

  toggleDetails() {
    this.details = !this.details;
  }

  onBuy = () => {
    alert(`You bought ${this.product.name}`);
    console.log(this.product);
  }

  onClick = () => {
    this.clickedProductId.emit(this.product.id);
  }
  onDelete = () => {
    this.deleteProductId.emit(this.product.id);
  }
  onEdit = () => {
    this.editProductId.emit(this.product.id);
  }

}
