// src/app/shared/services/payment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PayHerePaymentRequest {
  merchant_id: string;
  return_url: string;
  cancel_url: string;
  notify_url: string;
  order_id: string;
  items: string;
  currency: string;
  amount: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  delivery_address: string;
  delivery_city: string;
  delivery_country: string;
  custom_1?: string;
  custom_2?: string;
}

export interface PayHerePaymentResponse {
  status: string;
  msg: string;
  payment_url?: string;
  transaction_id?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  // 🔄 Replace these with your live credentials when going to production
  private config = {
    // Test Mode Credentials (Replace with live when ready)
    merchantId: '1227090', // Test merchant ID - REPLACE with your live merchant ID
    merchantSecret: 'MzM1OTUzMjUyODg2MDQ1NzE0OTU3NjEyNzk4ODA3MDk1OTU0MDI=', // Test secret - REPLACE with your live secret
    
    // URLs - Replace these with your live URLs
    baseUrl: 'https://sandbox.payhere.lk/pay/', // Test URL - Change to https://www.payhere.lk/pay/ for live
    returnUrl: window.location.origin + '/checkout/return',
    cancelUrl: window.location.origin + '/checkout/cancel',
    notifyUrl: window.location.origin + '/api/payment/notify',
    
    // Currency
    currency: 'LKR'
  };

  constructor(private http: HttpClient) {}

  /**
   * Generate PayHere payment hash for signature
   */
  generateHash(paymentData: any): string {
    // PayHere signature format: 
    // merchant_id + order_id + amount + currency + merchant_secret
    const hashString = 
      this.config.merchantId + 
      paymentData.order_id + 
      paymentData.amount + 
      this.config.currency + 
      this.config.merchantSecret;
    
    return btoa(hashString); // Base64 encode (PayHere uses base64 encoding)
  }

  /**
   * Create a PayHere payment request
   */
  initiatePayment(orderData: any): Observable<PayHerePaymentResponse> {
    const paymentData: PayHerePaymentRequest = {
      merchant_id: this.config.merchantId,
      return_url: this.config.returnUrl,
      cancel_url: this.config.cancelUrl,
      notify_url: this.config.notifyUrl,
      order_id: orderData.orderId || 'ORD-' + Date.now(),
      items: orderData.items || 'Order Items',
      currency: this.config.currency,
      amount: orderData.amount.toString(),
      first_name: orderData.firstName || 'Customer',
      last_name: orderData.lastName || '',
      email: orderData.email || 'customer@example.com',
      phone: orderData.phone || '0771234567',
      address: orderData.address || '',
      city: orderData.city || '',
      country: orderData.country || 'Sri Lanka',
      delivery_address: orderData.deliveryAddress || orderData.address || '',
      delivery_city: orderData.deliveryCity || orderData.city || '',
      delivery_country: orderData.deliveryCountry || orderData.country || 'Sri Lanka',
      custom_1: orderData.custom1 || '',
      custom_2: orderData.custom2 || ''
    };

    // Generate signature (hash)
    const hash = this.generateHash(paymentData);
    
    // Create form data for PayHere
    const formData = new FormData();
    Object.entries(paymentData).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    formData.append('hash', hash);

    // Return the payment URL
    return new Observable<PayHerePaymentResponse>((observer) => {
      // For test mode, we'll return the payment URL
      // In production, this would call your backend API
      const paymentUrl = this.config.baseUrl + '?merchant_id=' + this.config.merchantId + 
                         '&order_id=' + paymentData.order_id +
                         '&amount=' + paymentData.amount +
                         '&currency=' + paymentData.currency +
                         '&hash=' + hash;

      observer.next({
        status: 'success',
        msg: 'Payment initiated successfully',
        payment_url: paymentUrl,
        transaction_id: paymentData.order_id
      });
      observer.complete();
    });
  }

  /**
   * Verify payment status (called from return URL)
   */
  verifyPayment(orderId: string): Observable<any> {
    // In production, this would call your backend API
    // For test, we'll simulate verification
    return new Observable((observer) => {
      // Simulate API call
      setTimeout(() => {
        observer.next({
          status: 'success',
          message: 'Payment verified successfully',
          data: {
            orderId: orderId,
            amount: '1000.00',
            status: 'Completed',
            transactionId: 'TXN-' + Date.now()
          }
        });
        observer.complete();
      }, 1000);
    });
  }

  /**
   * Get payment gateway configuration
   */
  getConfig() {
    return this.config;
  }

  /**
   * Update configuration for production
   */
  setLiveConfig(config: {
    merchantId: string;
    merchantSecret: string;
    baseUrl: string;
  }) {
    this.config.merchantId = config.merchantId;
    this.config.merchantSecret = config.merchantSecret;
    this.config.baseUrl = config.baseUrl;
  }
}