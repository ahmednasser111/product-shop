import { Component, Input } from '@angular/core';
import { IProduct } from '../../models/product.model';

@Component({
  selector: 'app-total-price',
  templateUrl: './total-price.html',
})
export class TotalPrice {
  @Input() products: IProduct[] = [];

  get total(): number {
    return this.products.reduce((sum, product) => sum + product.price, 0);
  }
}
