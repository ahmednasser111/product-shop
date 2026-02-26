import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { ProductCard } from '../../components/product-card/product-card';
import { FilterBar } from '../../components/filter-bar/filter-bar';
import { TotalPrice } from '../../components/total-price/total-price';

import { IProduct } from '../../models/product.model';
import { FilterState } from '../../models/filter-state.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterLink, ProductCard, FilterBar, TotalPrice],
  templateUrl: './products.html',
})
export class Products implements OnInit {

  private router         = inject(Router);
  private productService = inject(ProductService);

  allProducts      = signal<IProduct[]>([]);
  filteredProducts = signal<IProduct[]>([]);
  isLoading        = signal<boolean>(true);
  error            = signal<string | null>(null);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.productService.getAll().subscribe({
      next: (products) => {
        this.allProducts.set(products);
        this.filteredProducts.set(products);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Failed to load products. Is JSON Server running?');
        this.isLoading.set(false);
      }
    });
  }

  onProductClicked(id: number): void {
    this.router.navigate(['/product', id]);
  }

  onProductEdited(id: number): void {
    this.router.navigate(['/products/edit', id]);
  }

  onProductDeleted(id: number): void {
    this.productService.delete(id).subscribe({
      next: () => {
        this.allProducts.update(prev => prev.filter(p => p.id !== id));
        this.filteredProducts.update(prev => prev.filter(p => p.id !== id));
      },
      error: () => {
        this.error.set('Failed to delete product.');
      }
    });
  }

  onFilterChanged(state: FilterState): void {
    let result = [...this.allProducts()];

    if (state.category !== 'All')
      result = result.filter(p =>
        p.category.toLowerCase() === state.category.toLowerCase()
      );

    if (state.name.trim())
      result = result.filter(p =>
        p.name.toLowerCase().includes(state.name.toLowerCase())
      );

    result = result.filter(p =>
      p.price >= state.minPrice && p.price <= state.maxPrice
    );

    result.sort((a, b) => {
      if (state.sortBy === 'price-asc')  return a.price - b.price;
      if (state.sortBy === 'price-desc') return b.price - a.price;
      if (state.sortBy === 'rating')     return b.rating - a.rating;
      return a.name.localeCompare(b.name);
    });

    this.filteredProducts.set(result);
  }
}