import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';
import { PRODUCTS } from '../data/product.data';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
	private products : IProduct[] = PRODUCTS;

	getAll = () => this.products;
	getById = (id: number) => this.products.find(p => p.id === id);
	getByCategory = (category: string) => this.products.filter(p => p.category === category);
	getAllCategories = () => [... new Set(this.products.map(p => p.category))];
	getBySearch = (search: string) => this.products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
	post = (product: Omit<IProduct, 'id'>) => this.products.push({...product, id: this.products.length + 1});
	delete = (id: number) => this.products = this.products.filter(p => p.id !== id);
	update = (id : number, product: Omit<IProduct, 'id'>) => {
		this.products = this.products.map(p => p.id === id ? {...product, id} : p);
	}
}

