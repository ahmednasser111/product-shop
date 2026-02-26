import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../models/product.model';
import { PRODUCTS } from '../../data/product.data';
import { BuyButton } from '../../components/buy-button/buy-button';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  
  imports: [BuyButton],
  templateUrl: './product.html',
})
export class Product {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);

  product: IProduct | undefined;

  ngOnInit(): void {
    this.product = this.productService.getById(+this.route.snapshot.params['id']);
    if (!this.product) {
      this.router.navigate(['/products']);
    }
  }
  onBuy = () => {
    alert(`You added ${this.product?.name} to cart`);
    console.log(this.product);
  }
}
