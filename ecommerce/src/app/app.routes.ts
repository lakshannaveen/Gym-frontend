import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/home-page.component';
import { ShopPageComponent } from './features/shop/shop-page.component';
import { ProductPageComponent } from './features/product/product-page.component';
import { AuthPageComponent } from './features/auth/auth-page.component';
import { DashboardPageComponent } from './features/dashboard/dashboard-page.component';
import { CheckoutPageComponent } from './features/checkout/checkout-page.component';
import { TrackingPageComponent } from './features/tracking/tracking-page.component';

export const routes: Routes = [
	{
		path: '',
		component: HomePageComponent,
	},
	{
		path: 'shop',
		component: ShopPageComponent,
	},
	{
		path: 'product',
		component: ProductPageComponent,
	},
	{
		path: 'auth',
		component: AuthPageComponent,
	},
	{
		path: 'dashboard',
		component: DashboardPageComponent,
	},
	{
		path: 'checkout',
		component: CheckoutPageComponent,
	},
	{
		path: 'tracking',
		component: TrackingPageComponent,
	},
	{
		path: '**',
		redirectTo: '',
	},
];
