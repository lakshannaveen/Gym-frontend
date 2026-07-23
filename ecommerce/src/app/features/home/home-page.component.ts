import { CurrencyPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BACKEND_URL } from '../../shared/config/backend-url';
import { CATEGORY_PROMOTIONS, FEATURED_PRODUCTS, FLASH_DEALS, HERO_SLIDES, STORE_CATEGORIES, STORE_STATS } from '../../shared/data/products.data';
import { ProductCardComponent } from '../products/product-card.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CurrencyPipe, ProductCardComponent, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  protected readonly backendUrl = BACKEND_URL;
  protected readonly stats = STORE_STATS;
  protected readonly categories = STORE_CATEGORIES;
  protected readonly slides = HERO_SLIDES;
  protected readonly deals = FLASH_DEALS;
  protected readonly products = FEATURED_PRODUCTS;
  protected readonly promotions = CATEGORY_PROMOTIONS;
  protected currentSlide = 0;
  protected secondsElapsed = 0;
  protected couponMessage = '';
  private timerId?: ReturnType<typeof setInterval>;

  constructor(private readonly router: Router) {}

  ngOnInit(): void { this.timerId = setInterval(() => this.secondsElapsed++, 1000); }

  ngOnDestroy(): void { if (this.timerId) clearInterval(this.timerId); }

  selectSlide(index: number): void {
    this.currentSlide = index;
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  previousSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  countdownFor(durationSeconds: number): string {
    const remaining = Math.max(0, durationSeconds - this.secondsElapsed);
    const hours = Math.floor(remaining / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((remaining % 3600) / 60).toString().padStart(2, '0');
    const seconds = (remaining % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  showCoupon(code: string): void {
    this.couponMessage = code.trim().toUpperCase() === 'SKYSAT10'
      ? 'SKYSAT10 is active — save LKR 500 on orders above LKR 10,000.'
      : 'Try code SKYSAT10 for LKR 500 off orders above LKR 10,000.';
  }

  trackOrder(orderId: string): void {
    const id = orderId.trim();
    this.router.navigate(['/tracking'], { queryParams: id ? { order: id } : {} });
  }
}
