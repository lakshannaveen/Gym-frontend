import { Injectable, computed, signal } from '@angular/core';
import { CartItem, Product } from '../models/product.model';

const CART_STORAGE_KEY = 'sky-sat-lanka-cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly items = signal<CartItem[]>(this.restore());
  readonly isOpen = signal(false);
  readonly itemCount = computed(() => this.items().reduce((total, item) => total + item.quantity, 0));
  readonly totalLkr = computed(() => this.items().reduce((total, item) => total + item.product.priceLkr * item.quantity, 0));

  add(product: Product, openCart = true): void {
    const existing = this.items().find((item) => item.product.id === product.id);
    const nextItems = existing
      ? this.items().map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...this.items(), { product, quantity: 1 }];
    this.update(nextItems);
    if (openCart) this.open();
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) return this.remove(productId);
    this.update(this.items().map((item) => item.product.id === productId ? { ...item, quantity } : item));
  }

  remove(productId: number): void {
    this.update(this.items().filter((item) => item.product.id !== productId));
  }

  clear(): void { this.update([]); }
  open(): void { this.isOpen.set(true); }
  close(): void { this.isOpen.set(false); }

  private update(items: CartItem[]): void {
    this.items.set(items);
    if (typeof localStorage !== 'undefined') localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }

  private restore(): CartItem[] {
    if (typeof localStorage === 'undefined') return [];
    try { return JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]') as CartItem[]; }
    catch { return []; }
  }
}
