import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
})
export class CheckoutPageComponent {
  protected readonly cart = inject(CartService);
  protected orderPlaced = false;

  placeOrder(): void {
    if (!this.cart.items().length) return;
    this.cart.clear();
    this.orderPlaced = true;
  }
}
