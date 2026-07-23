// src/app/checkout/checkout-page.component.ts
import { CurrencyPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { PaymentService } from '../../shared/services/payment.service';

interface OrderDetails {
  province: string;
  city: string;
  paymentMethod: 'cod' | 'card';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

interface CardDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolderName: string;
}

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, NgIf],
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
})
export class CheckoutPageComponent implements OnInit {
  protected readonly cart = inject(CartService);
  protected readonly paymentService = inject(PaymentService);
  protected readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);
  
  protected orderPlaced = false;
  protected isDropdownOpen = false;
  protected isProcessingPayment = false;
  protected showPaymentSuccess = false;
  protected transactionId = '';
  protected paymentUrl = '';
  protected isRedirecting = false;
  
  protected orderDetails: OrderDetails = {
    province: '',
    city: '',
    paymentMethod: 'cod',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  };

  protected cardDetails: CardDetails = {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: ''
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

  // Test card numbers for different scenarios
  protected testCards = {
    visa: '4242424242424242',
    mastercard: '5555555555554444',
    amex: '378282246310005',
    discover: '6011111111111117'
  };

  ngOnInit() {
    // Check for payment return parameters
    this.route.queryParams.subscribe(params => {
      if (params['order_id'] && params['payment_status']) {
        this.handlePaymentReturn(params);
      }
    });
  }

  placeOrder(): void {
    if (!this.cart.items().length) return;
    if (!this.isFormValid()) {
      alert('Please fill in all required fields before placing your order.');
      return;
    }
    
    // For COD orders, place order directly
    console.log('Order placed with details:', this.orderDetails);
    console.log('Order items:', this.cart.items());
    console.log('Total:', this.cart.totalLkr());
    
    this.cart.clear();
    this.orderPlaced = true;
  }

  processCardPayment(): void {
    if (!this.isCardFormValid()) {
      alert('Please fill in all card details correctly.');
      return;
    }

    // For PayHere, we don't need to send card details directly
    // We redirect to PayHere payment page
    this.initiatePayHerePayment();
  }

  initiatePayHerePayment(): void {
    this.isProcessingPayment = true;

    const orderData = {
      orderId: 'ORD-' + Date.now(),
      amount: this.cart.totalLkr(),
      items: this.cart.items().map(item => item.product.name).join(', '),
      firstName: this.orderDetails.firstName || 'Customer',
      lastName: this.orderDetails.lastName || '',
      email: this.orderDetails.email || 'customer@example.com',
      phone: this.orderDetails.phone || '0771234567',
      address: this.orderDetails.address || '',
      city: this.orderDetails.city || '',
      country: 'Sri Lanka',
      deliveryAddress: this.orderDetails.address || '',
      deliveryCity: this.orderDetails.city || '',
      deliveryCountry: 'Sri Lanka',
      custom1: this.orderDetails.province || '',
      custom2: this.cart.totalLkr().toString()
    };

    this.paymentService.initiatePayment(orderData).subscribe({
      next: (response) => {
        this.isProcessingPayment = false;
        if (response.payment_url) {
          this.paymentUrl = response.payment_url;
          this.transactionId = response.transaction_id || orderData.orderId;
          
          // Open PayHere payment page in new window or redirect
          this.isRedirecting = true;
          // Redirect to PayHere payment page
          window.location.href = this.paymentUrl;
        } else {
          alert('Failed to initiate payment. Please try again.');
        }
      },
      error: (error) => {
        this.isProcessingPayment = false;
        console.error('Payment initiation error:', error);
        alert('Payment initiation failed. Please try again.');
      }
    });
  }

  handlePaymentReturn(params: any): void {
    const orderId = params['order_id'];
    const paymentStatus = params['payment_status'];
    const statusCode = params['status_code'];
    const md5sig = params['md5sig'];

    // Verify payment status
    this.paymentService.verifyPayment(orderId).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.transactionId = response.data.transactionId;
          this.showPaymentSuccess = true;
          // Clear cart and show success
          this.cart.clear();
        } else {
          alert('Payment verification failed. Please contact support.');
          this.router.navigate(['/checkout']);
        }
      },
      error: (error) => {
        console.error('Payment verification error:', error);
        alert('Payment verification failed. Please contact support.');
        this.router.navigate(['/checkout']);
      }
    });
  }

  completeOrder(): void {
    this.showPaymentSuccess = false;
    this.orderPlaced = true;
    // Remove query params from URL
    this.router.navigate(['/checkout'], { queryParams: {} });
  }

  closePaymentSuccess(): void {
    // Optional: Don't close automatically
  }

  formatCardNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();
    this.cardDetails.cardNumber = formattedValue;
  }

  formatExpiryDate(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
      const month = value.substring(0, 2);
      const year = value.substring(2);
      value = month + '/' + year;
    }
    this.cardDetails.expiryDate = value;
  }

  maskCardNumber(cardNumber: string): string {
    const digits = cardNumber.replace(/\s/g, '');
    if (digits.length <= 4) return digits;
    return '**** **** **** ' + digits.slice(-4);
  }

  isFormValid(): boolean {
    return !!(this.orderDetails.province && 
              this.orderDetails.city && 
              this.orderDetails.paymentMethod &&
              this.orderDetails.firstName &&
              this.orderDetails.email &&
              this.orderDetails.phone &&
              this.orderDetails.address);
  }

  isCardFormValid(): boolean {
    const cardNum = this.cardDetails.cardNumber.replace(/\s/g, '');
    const expiry = this.cardDetails.expiryDate.replace('/', '');
    
    return !!(cardNum.length >= 16 && 
              this.cardDetails.cardHolderName.trim().length >= 2 &&
              expiry.length === 4 &&
              this.cardDetails.cvv.length >= 3 &&
              this.cardDetails.cvv.length <= 4);
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

  // Helper method to auto-fill test card
  fillTestCard(type: 'visa' | 'mastercard' | 'amex' | 'discover'): void {
    this.cardDetails.cardNumber = this.testCards[type];
    this.cardDetails.expiryDate = '12/26';
    this.cardDetails.cvv = '123';
    this.cardDetails.cardHolderName = 'Test User';
  }

  // Fill test customer details for faster testing
  fillTestCustomer(): void {
    this.orderDetails.firstName = 'John';
    this.orderDetails.lastName = 'Doe';
    this.orderDetails.email = 'john.doe@example.com';
    this.orderDetails.phone = '0771234567';
    this.orderDetails.address = '123 Main Street';
    this.orderDetails.city = 'Colombo';
    this.orderDetails.province = 'Western Province';
  }
}