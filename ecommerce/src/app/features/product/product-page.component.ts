import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SHOP_PRODUCTS } from '../../shared/data/products.data';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent {
  protected readonly products = SHOP_PRODUCTS;
  protected selectedImageIndex = 0;
  protected quantity = 1;
  protected readonly slug: string;

  constructor(private route: ActivatedRoute) {
    this.slug = this.route.snapshot.paramMap.get('slug') ?? this.products[0].slug;
  }

  get product() {
    return this.products.find((item) => item.slug === this.slug) ?? this.products[0];
  }

  get currentImage() {
    return this.product.gallery[this.selectedImageIndex] ?? this.product.image;
  }

  increaseQuantity(): void {
    this.quantity += 1;
  }

  decreaseQuantity(): void {
    this.quantity = Math.max(1, this.quantity - 1);
  }

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }
}
