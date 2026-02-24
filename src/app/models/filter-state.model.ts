export interface FilterState {
    category: string;
    name: string;
    minPrice: number;
    maxPrice: number;
    sortBy: 'price-asc' | 'price-desc' | 'rating' | 'name';
}