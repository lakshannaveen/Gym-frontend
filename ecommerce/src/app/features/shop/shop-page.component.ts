import { Component } from '@angular/core';

@Component({
  selector: 'app-shop-page',
  standalone: true,
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css'],
})
export class ShopPageComponent {
  protected readonly filters = ['All Products', 'Satellite TV', 'Receivers', 'Accessories', 'Installation'];
  protected readonly products = [
    { name: 'HD Satellite Receiver', price: 'LKR 24,900', note: 'Reliable performance for family viewing.' },
    { name: 'Outdoor Dish Kit', price: 'LKR 18,500', note: 'Built for Sri Lanka weather conditions.' },
    { name: 'Signal Booster', price: 'LKR 7,900', note: 'Improves reception and stability.' },
    { name: 'Professional Installation', price: 'From LKR 5,000', note: 'Clean setup by trained technicians.' },
  ];
}
