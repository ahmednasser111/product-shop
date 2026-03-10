import { ChangeDetectorRef, Component, OnInit, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '../../models/product.model';
import { BuyButton } from '../../components/buy-button/buy-button';
import { ProductService } from '../../services/product.service';
import { HttpClient } from '@angular/common/http';
import { UserAuth } from '../../services/auth.service';
import { ShoppingCartService } from '../../services/shopping-cart-service';
import { ReviewService } from '../../services/review-service';
import { FormsModule } from '@angular/forms';
import { Review } from '../../models/review';

@Component({
  selector: 'app-product',

  imports: [BuyButton, FormsModule],
  templateUrl: './product.html',
})
export class Product implements OnInit {
  id = input<string>();

  private router = inject(Router);
  private productService = inject(ProductService);
  private http = inject(HttpClient);
  private auth = inject(UserAuth);
  private cd = inject(ChangeDetectorRef);
  private shoppingCartService = inject(ShoppingCartService);
  private reviewService = inject(ReviewService);

  newComment = '';
  newRating = 0;
  reviews: Review[] = [];

  product = signal<IProduct | undefined>(undefined);
  isLoading = signal<boolean>(true);
  user = this.auth.getUser();
  isFavoriteLoading = false;
  cartJoined = this.shoppingCartService.userCartJoined;

  ngOnInit(): void {
    const productId = this.id();

    if (!productId) {
      this.router.navigate(['/products']);
      return;
    }

    this.isLoading.set(true);
    this.productService.getById(productId).subscribe({
      next: (product) => {
        product.id = (product as any)._id;
        this.product.set(product);
        this.isLoading.set(false);
        if (!product) {
          this.router.navigate(['/products']);
        }
      },
      error: () => {
        this.isLoading.set(false);
        this.router.navigate(['/products']);
      },
    });
  }

  onBuy = () => {
    console.log({
      usrCart: this.cartJoined(),
      prdId: this.id(),
      usrId: this.auth.getId(),
    });

    if (this.cartJoined().order) {
      const prdQtyList = this.cartJoined().order.prdQtyList;
      const prdQtyy = prdQtyList.findIndex((prd) => prd.prdId == this.id());
      console.log({ prdQtyy });

      if (prdQtyy !== -1) {
        console.log('inside If');

        prdQtyList[prdQtyy].quantity +=
          prdQtyList[prdQtyy].quantity >= prdQtyList[prdQtyy].productDetails!.stock
            ? prdQtyList[prdQtyy].productDetails!.stock - prdQtyList[prdQtyy].quantity
            : 1;
      } else {
        prdQtyList.push({ prdId: this.id()!, quantity: 1 });
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
        .post(this.auth.getId(), [{ prdId: this.id()!, quantity: 1 }])
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

  async handleFavorite() {
    this.isFavoriteLoading = true;
    this.cd.detectChanges();
    const currentProduct = this.product();
    if (currentProduct) {
      if (!this.user) {
        alert('You must be logged in to add to favorites');
        this.isFavoriteLoading = false;
        this.cd.detectChanges();
        return;
      }
      if (this.user.favorites?.includes(currentProduct!.id)) {
        this.removeFromFavorites();
      } else {
        this.addToFavorites();
      }
    }
  }

  async addToFavorites() {
    if (!this.user) {
      alert('You must be logged in to add to favorites');
      return;
    }
    const currentProduct = this.product();
    if (currentProduct) {
      const token = await this.auth.getToken();
      this.http
        .put(
          `http://localhost:3000/users/favorites/${currentProduct.id}`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .subscribe({
          complete: () => {
            this.isFavoriteLoading = false;
            this.cd.detectChanges();
          },
          next: () => {
            // alert(`You added ${currentProduct.name} to favorites`);
            this.user!.favorites?.push(currentProduct.id);
          },
          error: (error) => {
            alert(`Failed to add ${currentProduct.name} to favorites`);
            console.log(error);
          },
        });
    }
  }

  async removeFromFavorites() {
    if (!this.user) {
      alert('You must be logged in to remove from favorites');
      return;
    }
    const currentProduct = this.product();
    if (currentProduct) {
      const token = await this.auth.getToken();
      this.http
        .delete(`http://localhost:3000/users/favorites/${currentProduct.id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .subscribe({
          complete: () => {
            this.isFavoriteLoading = false;
            this.cd.detectChanges();
          },
          next: (data) => {
            this.user!.favorites = this.user?.favorites?.filter((id) => id !== currentProduct.id);
          },
          error: (error) => {
            alert(`Failed to remove ${currentProduct.name} from favorites`);
            console.log(error);
          },
        });
    }
  }

  async submitReview() {
    if (!this.user) {
      alert('You must be logged in to submit a review');
      return;
    }
    const currentProduct = this.product();
    if (currentProduct) {
      const obs = await this.reviewService.postReview(
        currentProduct.id,
        this.newRating,
        this.newComment,
      );
      obs.subscribe({
        next: () => {
          alert('Review submitted successfully');
          this.newComment = '';
          this.newRating = 0;
        },
        error: (error: any) => {
          alert('Failed to submit review');
          console.log(error);
        },
      });
    }
  }
}
