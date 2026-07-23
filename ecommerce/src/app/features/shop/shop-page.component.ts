import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SHOP_PRODUCTS, STORE_CATEGORIES } from '../../shared/data/products.data';
import { ProductCardComponent } from '../products/product-card.component';

@Component({
  selector: 'app-shop-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent, RouterLink],
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css'],
})
export class ShopPageComponent {
  protected readonly categories = STORE_CATEGORIES;
  protected readonly products = SHOP_PRODUCTS;
  protected selectedCategory = 'all';
  protected selectedDeal = 'all';
  protected sortBy = 'featured';
  protected currentPage = 1;
  protected readonly pageSize = 6;

  get visibleProducts() {
    const filtered = this.filteredProducts;

    filtered.sort((first, second) => {
      if (this.sortBy === 'price-asc') {
        return first.priceLkr - second.priceLkr;
      }

      if (this.sortBy === 'price-desc') {
        return second.priceLkr - first.priceLkr;
      }

      if (this.sortBy === 'newest') {
        return second.id - first.id;
      }

      return Number(second.featured) - Number(first.featured);
    });

    return filtered.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
  }

  get filteredProducts() {
    return this.products.filter((product) => {
      const categoryMatch = this.selectedCategory === 'all' || product.category.toLowerCase().includes(this.selectedCategory);
      const dealMatch = this.selectedDeal === 'all' || (this.selectedDeal === 'sale' ? Boolean(product.compareAtLkr) : (product.deal ?? '').toLowerCase().includes(this.selectedDeal));

      return categoryMatch && dealMatch;
    });
  }

  get filteredCount() {
    return this.filteredProducts.length;
  }

  get pageCount() {
    return Math.max(1, Math.ceil(this.filteredCount / this.pageSize));
  }

  setCategory(category: string): void {
    this.selectedCategory = category;
    this.currentPage = 1;
  }

  setDeal(deal: string): void {
    this.selectedDeal = deal;
    this.currentPage = 1;
  }

  setSort(sortBy: string): void {
    this.sortBy = sortBy;
  }

  nextPage(): void {
    this.currentPage = Math.min(this.pageCount, this.currentPage + 1);
  }

  previousPage(): void {
    this.currentPage = Math.max(1, this.currentPage - 1);
  }
}
