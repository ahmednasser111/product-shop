import { Component, Input } from '@angular/core';
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

  toggleDetails() {
    this.details = !this.details;
  }

  onClick = () => {
    alert(`You bought ${this.product.name}`);
    console.log(this.product);
  }

}
