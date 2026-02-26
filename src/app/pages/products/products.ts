import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../../components/product-card/product-card';
import { FilterBar } from '../../components/filter-bar/filter-bar';
import { TotalPrice } from '../../components/total-price/total-price';
import { FilterState } from '../../models/filter-state.model';
import { IProduct } from '../../models/product.model';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterLink, ProductCard, FilterBar, TotalPrice],
  templateUrl: './products.html',
})
export class Products implements OnInit {
  private router = inject(Router);

  filteredProducts: IProduct[] = [];
  private productService = inject(ProductService);

  ngOnInit(): void {
    this.filteredProducts = this.productService.getAll();
  }

  onProductClicked(id: number): void {
    this.router.navigate(['/product', id]);
  }

  onEditProduct(id: number): void {
    this.router.navigate(['/products/edit', id]);
  }

  onDeleteProduct(id: number): void {
    this.productService.delete(id);
    this.filteredProducts = this.productService.getAll();
  }

  onFilterChanged(state: FilterState): void {
    let result = this.productService.getAll();

    if (state.category !== 'All')
      result = result.filter(p => p.category === state.category);

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

    this.filteredProducts = result;
  }
}