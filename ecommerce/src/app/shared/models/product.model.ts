export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  priceLkr: number;
  compareAtLkr?: number;
  description: string;
  image: string;
  gallery: string[];
  badge?: string;
  availability?: string;
  stockCount: number;
  specs: string[];
  featured?: boolean;
  deal?: string;
}

export interface StoreCategory {
  title: string;
  slug: string;
  icon: string;
  description: string;
}

export interface HeroSlide {
  title: string;
  kicker: string;
  description: string;
  image: string;
  primaryAction: string;
  secondaryAction: string;
  priceLkr: number;
  compareAtLkr?: number;
}

export interface CategoryPromotion {
  title: string;
  detail: string;
  discount: string;
  category: string;
}

export interface FlashDeal {
  title: string;
  productSlug: string;
  durationSeconds: number;
  note: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderRecord {
  id: string;
  date: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  totalLkr: number;
  items: number;
}

export interface TrackingStep {
  label: string;
  note: string;
  completed: boolean;
}

export interface AddressBookItem {
  label: string;
  address: string;
  phone: string;
  primary?: boolean;
}
