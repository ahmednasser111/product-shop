import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { FilterState } from '../../models/filter-state.model';


@Component({
  selector: 'app-filter-bar',
  imports: [FormsModule],
  templateUrl: './filter-bar.html',
})
export class FilterBar {

  @Output() filterChanged = new EventEmitter<FilterState>();

  categories = ['All', 'Electronics', 'Sports', 'Kitchen'];

  filters: FilterState = {
    category: 'All',
    name: '',
    minPrice: 0,
    maxPrice: 2000,
    sortBy: 'name',
  };

  emit(): void {
    this.filterChanged.emit({ ...this.filters });
  }
}