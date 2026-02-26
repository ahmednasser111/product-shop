import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
})
export class ProductForm implements OnInit {
  private router         = inject(Router);
  private route          = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private id?: number;
  
  isEditMode: boolean = false;
  categories: string[] = [];

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
    category: new FormControl('', [
      Validators.required,
    ]),
    image: new FormControl('', [
      Validators.required,
    ]),
  });

  get name()        { return this.form.get('name')!; }
  get description() { return this.form.get('description')!; }
  get price()       { return this.form.get('price')!; }
  get rating()      { return this.form.get('rating')!; }
  get category()    { return this.form.get('category')!; }
  get image()       { return this.form.get('image')!; }

  ngOnInit(): void {
    this.categories = this.productService.getAllCategories();

    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : undefined;
    this.isEditMode = this.id !== undefined && !Number.isNaN(this.id);

    if (this.isEditMode) {
      const product = this.productService.getById(this.id!);

      if (!product) {
        this.router.navigate(['/products']);
        return;
      }

      this.form.setValue({
        name:        product.name,
        description: product.description,
        price:       product.price,
        rating:      product.rating,
        category:    product.category,
        image:       product.image,
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = {
      name:        this.form.value.name!,
      description: this.form.value.description!,
      price:       Number(this.form.value.price),
      rating:      Number(this.form.value.rating),
      category:    this.form.value.category!,
      image:       this.form.value.image!,
    };

    if (this.isEditMode) {
      this.productService.update(this.id!, formValue);
    } else {
      this.productService.post(formValue);
    }

    this.router.navigate(['/products']);
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }
}