import { AfterViewInit, Component, ElementRef, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SHOP_PRODUCTS, STORE_CATEGORIES } from '../../shared/data/products.data';
import { ProductCardComponent } from '../products/product-card.component';

@Component({
  selector: 'app-shop-page',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css'],
})
export class ShopPageComponent implements AfterViewInit, OnDestroy {
  protected readonly categories = STORE_CATEGORIES;
  protected readonly products = SHOP_PRODUCTS;
  protected selectedCategory = 'all';
  protected selectedDeal = 'all';
  protected selectedAvailability = 'all';
  protected sortBy = 'featured';
  protected currentPage = 1;
  protected readonly pageSize = 6;
  protected activeDropdown: 'category' | 'deal' | 'availability' | 'sort' | null = null;
  @ViewChildren(ProductCardComponent, { read: ElementRef }) private productCards!: QueryList<ElementRef<HTMLElement>>;
  private revealObserver?: IntersectionObserver;

  constructor(route: ActivatedRoute) {
    const category = route.snapshot.queryParamMap.get('category');
    if (category && STORE_CATEGORIES.some((item) => item.slug === category)) this.selectedCategory = category;
  }

  ngAfterViewInit(): void {
    if (!('IntersectionObserver' in window)) return;
    this.revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          this.revealObserver?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    this.observeCards();
    this.productCards.changes.subscribe(() => this.observeCards());
  }

  ngOnDestroy(): void { this.revealObserver?.disconnect(); }

  private observeCards(): void {
    this.productCards.forEach((card, index) => {
      const element = card.nativeElement;
      element.classList.add('reveal', index % 2 ? 'reveal-right' : 'reveal-left');
      this.revealObserver?.observe(element);
    });
  }

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
      const selectedCategoryTitle = this.categories.find((category) => category.slug === this.selectedCategory)?.title;
      const categoryMatch = this.selectedCategory === 'all' || product.category === selectedCategoryTitle;
      const dealMatch = this.selectedDeal === 'all' || (this.selectedDeal === 'sale' ? Boolean(product.compareAtLkr) : (product.deal ?? '').toLowerCase().includes(this.selectedDeal));
      const availabilityMatch = this.selectedAvailability === 'all'
        || (this.selectedAvailability === 'low-stock' ? product.stockCount <= 10 : product.stockCount > 0);

      return categoryMatch && dealMatch && availabilityMatch;
    });
  }

  get filteredCount() {
    return this.filteredProducts.length;
  }

  get pageCount() {
    return Math.max(1, Math.ceil(this.filteredCount / this.pageSize));
  }

  get hasActiveFilters() {
    return this.selectedCategory !== 'all' || this.selectedDeal !== 'all' || this.selectedAvailability !== 'all' || this.sortBy !== 'featured';
  }

  get selectedCategoryLabel() { return this.categories.find((category) => category.slug === this.selectedCategory)?.title || 'All categories'; }
  get selectedDealLabel() { return { all: 'All offers', sale: 'On sale', 'flash sale': 'Flash deals' }[this.selectedDeal] || 'All offers'; }
  get selectedAvailabilityLabel() { return { all: 'All stock levels', 'in-stock': 'In stock', 'low-stock': 'Low stock' }[this.selectedAvailability] || 'All stock levels'; }
  get selectedSortLabel() { return { featured: 'Featured', 'price-asc': 'Price: low to high', 'price-desc': 'Price: high to low', newest: 'Newest arrivals' }[this.sortBy] || 'Featured'; }

  toggleDropdown(dropdown: 'category' | 'deal' | 'availability' | 'sort'): void {
    this.activeDropdown = this.activeDropdown === dropdown ? null : dropdown;
  }

  closeDropdown(): void { this.activeDropdown = null; }

  setCategory(category: string): void {
    this.selectedCategory = category;
    this.currentPage = 1;
    this.closeDropdown();
  }

  setDeal(deal: string): void {
    this.selectedDeal = deal;
    this.currentPage = 1;
    this.closeDropdown();
  }

  setAvailability(availability: string): void {
    this.selectedAvailability = availability;
    this.currentPage = 1;
    this.closeDropdown();
  }

  setSort(sortBy: string): void {
    this.sortBy = sortBy;
    this.currentPage = 1;
    this.closeDropdown();
  }

  clearFilters(): void {
    this.selectedCategory = 'all';
    this.selectedDeal = 'all';
    this.selectedAvailability = 'all';
    this.sortBy = 'featured';
    this.currentPage = 1;
  }

  nextPage(): void {
    this.currentPage = Math.min(this.pageCount, this.currentPage + 1);
  }

  previousPage(): void {
    this.currentPage = Math.max(1, this.currentPage - 1);
  }
}
