import { ChangeDetectorRef, Component, OnInit, inject, input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category-service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.html',
})
export class ProductForm implements OnInit {
  id = input<string>();

  private router = inject(Router);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private cd = inject(ChangeDetectorRef);

  isEditMode: boolean = false;
  isSubmitting: boolean = false;
  isLoading: boolean = false;
  categories: { [key: string]: Category } = {};
  error: string | null = null;

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    stock: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    category: new FormControl<string>('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });

  get name() {
    return this.form.get('name')!;
  }
  get description() {
    return this.form.get('description')!;
  }
  get price() {
    return this.form.get('price')!;
  }
  get stock() {
    return this.form.get('stock')!;
  }
  get category() {
    return this.form.get('category')!;
  }
  get image() {
    return this.form.get('image')!;
  }

  get getCategories() {
    return Object.values(this.categories);
  }

  ngOnInit(): void {
    this.isEditMode = !!this.id();

    this.categoryService.getAll().subscribe({
      next: (res) => {
        console.log(res);
        res.categories.map((c: any) => {
          this.categories[c._id] = { id: c._id, name: c.name };
        });
        this.cd.detectChanges();
      },
      error: (err) => console.error('Failed to load categories', err),
    });

    if (this.isEditMode) {
      this.isLoading = true;

      this.productService.getById(this.id()!).subscribe({
        next: (product) => {
          console.log(product);
          this.form.setValue({
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock ?? 0,
            category: (product.category as any)?.id || product.category,
            image: product.image,
          });
          this.isLoading = false;
        },
        error: () => {
          this.router.navigate(['/products']);
        },
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.error = null;
    const formValue = {
      name: this.form.value.name!,
      description: this.form.value.description!,
      price: Number(this.form.value.price),
      stock: Number(this.form.value.stock),
      category: this.form.value.category!,
      image: this.form.value.image!,
      rating: 0,
      sellerId: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const request$ = this.isEditMode
      ? this.productService.update(this.id()!, formValue)
      : this.productService.post(formValue);

    request$.subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/products']);
      },
      error: () => {
        this.isSubmitting = false;
        this.error = 'Something went wrong. Please try again.';
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }
}
