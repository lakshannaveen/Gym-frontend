import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BACKEND_URL } from '../../shared/config/backend-url';
import { FEATURED_PRODUCTS, FLASH_DEALS, HERO_SLIDES, STORE_CATEGORIES, STORE_STATS } from '../../shared/data/products.data';
import { ProductCardComponent } from '../products/product-card.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProductCardComponent, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  protected readonly backendUrl = BACKEND_URL;
  protected readonly stats = STORE_STATS;
  protected readonly categories = STORE_CATEGORIES;
  protected readonly slides = HERO_SLIDES;
  protected readonly deals = FLASH_DEALS;
  protected readonly products = FEATURED_PRODUCTS;
  protected currentSlide = 0;

  selectSlide(index: number): void {
    this.currentSlide = index;
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  previousSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }
}
