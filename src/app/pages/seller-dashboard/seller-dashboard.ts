import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../models/product.model';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { UserAuth } from '../../services/auth.service';

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   stock: number;
//   description: string;
//   rating: number;
//   category: string;
// }

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.html',
  imports: [ReactiveFormsModule, CommonModule],
})
export class SellerDashboard {
  products: IProduct[] = [
    {
      id: 1,
      name: 'test',
      description: 'testtt',
      price: 10,
      image: 'img',
      rating: 1,
      category: 'hi',
    },
  ];
  showModal = false;
  editing = false;
  editingId: number | null = null;

  constructor(
    private router: Router,
    private productsService: ProductService,
    private auth: UserAuth,
    private cd: ChangeDetectorRef,
  ) {
    productsService.getBySeller(auth.getId()!).subscribe({
      next: (data) => {
        this.products = data;
        this.cd.detectChanges();
      },
      error(err) {
        console.log(err);
      },
    });
  }

  goToAddProduct() {
    this.router.navigate(['/products/add']);
  }

  goToEditProduct(productId: string) {
    this.router.navigate([`/products/edit/${productId}`]);
  }

  deleteProduct(id: number) {
    this.products = this.products.filter((p) => p.id !== id);
  }
}
