import { Component, ChangeDetectorRef } from '@angular/core';
import { Category } from '../../models/category';
import { FormsModule } from '@angular/forms';

import { CategoryService } from '../../services/category-service';

@Component({
  selector: 'app-categories',
  imports: [FormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  constructor(
    private cd: ChangeDetectorRef,
    private categoryService: CategoryService,
  ) {}
  categories: Category[] = [];

  ngOnInit() {
    this.getCategories();
  }

  editingCategory: Category | null = null;

  newCategory = '';

  getCategories() {
    this.categoryService.getAll().subscribe((res) => {
      this.categories = res.categories.map((c: any) => {
        return {
          id: c._id,
          name: c.name,
        };
      });
      this.cd.detectChanges();
    });
  }

  async addCategory() {
    if (!this.newCategory.trim()) return;
    (await this.categoryService.createCategory(this.newCategory)).subscribe((res) => {
      this.categories.push({
        id: res.category._id,
        name: res.category.name,
      });
      this.cd.detectChanges();
    });

    this.newCategory = '';
  }

  async deleteCategory(id: string) {
    (await this.categoryService.deleteCategory(id)).subscribe((res) => {
      console.log(res);
      this.categories = this.categories.filter((c) => c.id !== id);
      this.cd.detectChanges();
    });
  }

  enableEdit(category: Category) {
    this.editingCategory = { ...category };
  }

  async saveEdit(category: Category) {
    console.log(category);
    (await this.categoryService.updateCategory(category.id, this.editingCategory!.name)).subscribe(
      (res) => {
        this.categories = this.categories.map((c) =>
          c.id === this.editingCategory!.id ? this.editingCategory! : c,
        );
        this.editingCategory = null;
        this.cd.detectChanges();
      },
    );
  }
}
