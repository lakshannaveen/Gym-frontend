import { Component } from '@angular/core';
import { PRODUCTS } from '../../shared/data/products.data';
import { ProductCardComponent } from '../products/product-card.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  protected readonly products = PRODUCTS;

  protected readonly stats = [
    { value: '120+', label: 'Curated products' },
    { value: '24h', label: 'Fast dispatch' },
    { value: '4.9/5', label: 'Customer rating' },
  ];

  protected readonly categories = [
    { name: 'Tech essentials', description: 'Smart gear built for daily use' },
    { name: 'Lifestyle picks', description: 'Accessories that feel premium' },
    { name: 'Activewear', description: 'Performance pieces with clean design' },
  ];

  protected readonly benefits = [
    'Premium materials and reliable quality checks',
    'Flexible payment and quick checkout flow',
    'Responsive storefront built for modern devices',
  ];
}
