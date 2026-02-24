import { Component } from '@angular/core';
import { PRODUCTS } from './data/product.data';
import { ProductCard } from './components/product-card/product-card';
import { TotalPrice } from './components/total-price/total-price';
import { FilterBar } from './components/filter-bar/filter-bar';
import { FilterState } from './models/filter-state.model';
import { IProduct } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [ProductCard, TotalPrice, FilterBar]
})
export class App {
 	products : IProduct[] = PRODUCTS;
 	filteredProducts: IProduct[] = PRODUCTS;

  	onFilterChanged(state: FilterState): void {
		let result = [...this.products];

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
