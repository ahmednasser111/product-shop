import { Component, OnInit, inject, input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.html',
})
export class ProductForm implements OnInit {

  id = input<string>();

  private router          = inject(Router);
  private productService  = inject(ProductService);

  isEditMode: boolean   = false;
  isSubmitting: boolean = false;
  isLoading: boolean    = false;
  categories: string[]  = [];
  error: string | null  = null;

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    description: new FormControl('', [
      Validators.required,
    ]),
    price: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),
    ]),
    rating: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(5),
    ]),
    category: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });

  get name()       { return this.form.get('name')!; }
  get description() { return this.form.get('description')!; }
  get price()       { return this.form.get('price')!; }
  get rating()      { return this.form.get('rating')!; }
  get category()    { return this.form.get('category')!; }
  get image()   { return this.form.get('image')!; }

  ngOnInit(): void {
    this.isEditMode = !!this.id();

    this.productService.getAllCategories().subscribe({
      next: (categories) => this.categories = categories,
      error: (err)  => console.error('Failed to load categories', err),
    });

    if (this.isEditMode) {
      this.isLoading = true;

      this.productService.getById(Number(this.id())).subscribe({
        next: (product) => {
          this.form.setValue({
            name:       product.name,
            description: product.description,
            price:       product.price,
            rating:      product.rating,
            category:    product.category,
            image:   product.image,
          });
          this.isLoading = false;
        },
        error: () => {
          this.router.navigate(['/products']);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.error        = null;

    const formValue = {
      name:       this.form.value.name!,
      description: this.form.value.description!,
      price:       Number(this.form.value.price),
      rating:      Number(this.form.value.rating),
      category:    this.form.value.category!,
      image:   this.form.value.image!,
    };

    const request$ = this.isEditMode
      ? this.productService.update(Number(this.id()), formValue)
      : this.productService.post(formValue);

    request$.subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/products']);
      },
      error: () => {
        this.isSubmitting = false;
        this.error = 'Something went wrong. Please try again.';
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }
}