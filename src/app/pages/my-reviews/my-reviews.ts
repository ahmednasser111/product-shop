import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { Review } from '../../models/review';
import { IProduct } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { ReviewService } from '../../services/review-service';
import { UserAuth } from '../../services/auth.service';

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
  private reviewService = inject(ReviewService);
  private auth = inject(UserAuth);
  activeTab: 'reviews' | 'favourites' = 'reviews';

  setTab(tab: 'reviews' | 'favourites') {
    this.activeTab = tab;
  }

  reviews: Review[] = [];

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

    this.reviewService.getByUser().then((obs) => {
      obs.subscribe({
        next: (data: any) => {
          console.log(data);
          this.reviews = data.reviews.map((review: any) => {
            return {
              ...review,
              id: review._id,
            };
          });
          this.cd.detectChanges();
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }

  goToProduct(product: IProduct) {
    this.router.navigate(['/product', product.id]);
  }
}
