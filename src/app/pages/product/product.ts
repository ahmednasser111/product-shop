import { Component, OnInit, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '../../models/product.model';
import { BuyButton } from '../../components/buy-button/buy-button';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  
  imports: [BuyButton],
  templateUrl: './product.html',
})
export class Product implements OnInit {

  id = input<string>();

  private router         = inject(Router);
  private productService = inject(ProductService);

  product = signal<IProduct | undefined>(undefined);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    const productId = this.id();
    
    if (!productId) {
      this.router.navigate(['/products']);
      return;
    }

    this.isLoading.set(true);
    this.productService.getById(+productId).subscribe({
      next: (product) => {
        this.product.set(product);
        this.isLoading.set(false);
        if (!product) {
          this.router.navigate(['/products']);
        }
      },
      error: () => {
        this.isLoading.set(false);
        this.router.navigate(['/products']);
      }
    });
  }

  onBuy = () => {
    const currentProduct = this.product();
    if (currentProduct) {
      alert(`You added ${currentProduct.name} to cart`);
      console.log(currentProduct);
    }
  }
}
