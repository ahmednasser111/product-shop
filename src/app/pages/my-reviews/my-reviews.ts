import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { Review } from '../../models/review';
import { IProduct } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { ReviewService } from '../../services/review-service';

@Component({
  selector: 'app-my-reviews',
  imports: [NgClass],
  templateUrl: './my-reviews.html',
  styleUrl: './my-reviews.css',
})
export class MyReviews {
  private productService = inject(ProductService);
  private cd = inject(ChangeDetectorRef);
  private router = inject(Router);
  private reviewsService = inject(ReviewService);
  activeTab: 'reviews' | 'favourites' = 'reviews';

  setTab(tab: 'reviews' | 'favourites') {
    this.activeTab = tab;
  }

  reviews: Review[] = [
    {
      id: '1',
      name: 'John Doe',
      rating: 5,
      comment: 'This is a great product!',
      product: {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        price: 100,
        rating: 5,
        category: { id: '1', name: 'Category 1' },
        image: 'https://via.placeholder.com/150',
        stock: 10,
        sellerId: '1',
        createdAt: '2022-01-01',
        updatedAt: '2022-01-01',
      },
      user: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        password: '',
        role: 'user',
        isVerified: true,
        isPaused: false,
      },
      createdAt: '2022-01-01',
      updatedAt: '2022-01-01',
    },
  ];

  favourites: IProduct[] = [];

  ngOnInit(): void {
    this.productService.getFavorites().then((obs) => {
      obs.subscribe({
        next: (data) => {
          console.log(data);
          this.favourites = data.favorites.map((product: any) => {
            return {
              ...product,
              id: product._id,
            };
          });
          this.cd.detectChanges();
        },
        error: (err) => {
          console.log(err);
        },
      });
    });

    this.reviewsService.getByUser().then((obs) => {
      if (obs != null) {
        obs.subscribe({
          next: (data) => {
            this.reviews = data.reviews;
            this.cd.detectChanges();
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  goToProduct(product: IProduct) {
    this.router.navigate(['/product', product.id]);
  }
}
