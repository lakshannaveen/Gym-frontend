import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../shared/services/cart.service';

interface OrderDetails {
  province: string;
  city: string;
  paymentMethod: 'cod' | 'card';
}

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
})
export class CheckoutPageComponent {
  protected readonly cart = inject(CartService);
  protected orderPlaced = false;
  protected isDropdownOpen = false;
  
  protected orderDetails: OrderDetails = {
    province: '',
    city: '',
    paymentMethod: 'cod'
  };

  protected provinces = [
    'Central Province',
    'Eastern Province',
    'Northern Province',
    'Southern Province',
    'Western Province',
    'North Western Province',
    'North Central Province',
    'Uva Province',
    'Sabaragamuwa Province'
  ];

  placeOrder(): void {
    if (!this.cart.items().length) return;
    if (!this.isFormValid()) {
      alert('Please fill in all required fields before placing your order.');
      return;
    }
    
    // Here you would typically send the order to your backend
    console.log('Order placed with details:', this.orderDetails);
    console.log('Order items:', this.cart.items());
    console.log('Total:', this.cart.totalLkr());
    
    this.cart.clear();
    this.orderPlaced = true;
  }

  private isFormValid(): boolean {
    return !!(this.orderDetails.province && 
              this.orderDetails.city && 
              this.orderDetails.paymentMethod);
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectProvince(province: string): void {
    this.orderDetails.province = province;
    this.isDropdownOpen = false;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }
}