import {
  AddressBookItem,
  CartItem,
  FlashDeal,
  HeroSlide,
  CategoryPromotion,
  OrderRecord,
  Product,
  StoreCategory,
  TrackingStep,
} from '../models/product.model';

export const STORE_STATS = [
  { value: '250+', label: 'Satellite installs completed' },
  { value: '24/7', label: 'Support for customer orders' },
  { value: '4.9/5', label: 'Average customer rating' },
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    title: 'Sky Sat Lanka keeps every home connected.',
    kicker: 'Satellite TV solutions',
    description:
      'High-gain dishes, HD receivers, premium cabling, and installation support packaged for Sri Lankan homes and businesses.',
    image:
      'https://images.unsplash.com/photo-1574850274043-1c5b1f3f5a57?auto=format&fit=crop&w=1400&q=80',
    primaryAction: 'Shop the collection',
    secondaryAction: 'Track an order',
    priceLkr: 18500,
    compareAtLkr: 21900,
  },
  {
    title: 'Flash sale pricing on best-selling decoders.',
    kicker: 'Time-bound deals',
    description:
      'Limited-time savings on satellite receivers, LNBs, and accessory bundles with easy delivery across the island.',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1400&q=80',
    primaryAction: 'View flash sale',
    secondaryAction: 'Browse receivers',
    priceLkr: 24900,
    compareAtLkr: 29900,
  },
];

export const CATEGORY_PROMOTIONS: CategoryPromotion[] = [
  { title: 'Receiver upgrade week', detail: 'Save on HD and 4K receivers while stocks last.', discount: '15% OFF receivers', category: 'receivers' },
  { title: 'Ready-to-install dish kits', detail: 'A complete outdoor setup for new connections.', discount: 'Save LKR 3,400', category: 'dishes' },
  { title: 'Cabling essentials', detail: 'Reliable signal accessories for every installation.', discount: 'Buy 2, save 10%', category: 'cables-lnbs' },
];

export const STORE_CATEGORIES: StoreCategory[] = [
  {
    title: 'Satellite Dishes',
    slug: 'dishes',
    icon: '◐',
    description: 'Outdoor kits, brackets, and weather-ready mounting hardware.',
    image: 'https://images.unsplash.com/photo-1612810806546-ebbf22b9f0e2?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Receivers / Decoders',
    slug: 'receivers',
    icon: '▣',
    description: 'HD and 4K set-top boxes for everyday viewing and premium packs.',
    image: 'https://images.unsplash.com/photo-1516910817561-3e43f9f4c0d0?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Cables & LNBs',
    slug: 'cables-lnbs',
    icon: '⎍',
    description: 'Signal-critical accessories, splitters, connectors, and LNB units.',
    image: 'https://images.unsplash.com/photo-1581092918367-97f9a34d36d7?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Accessories',
    slug: 'accessories',
    icon: '✦',
    description: 'Remote controls, cable ties, clamps, and practical add-ons.',
    image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80',
  },
];

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: 1,
    slug: 'hd-duo-receiver-4k',
    name: 'HD Duo Receiver 4K',
    category: 'Receivers / Decoders',
    priceLkr: 24900,
    compareAtLkr: 29900,
    description:
      'Compact decoder with crisp output, fast channel switching, and an easy setup flow for new installs.',
    image:
      'https://images.unsplash.com/photo-1516910817561-3e43f9f4c0d0?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516910817561-3e43f9f4c0d0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
    ],
    badge: 'Flash Deal',
    availability: 'Only 5 left',
    stockCount: 5,
    specs: ['4K output', 'Dual tuner', 'USB media playback', 'Fast boot mode'],
    featured: true,
    deal: 'On Sale',
  },
  {
    id: 2,
    slug: 'outdoor-60cm-dish-kit',
    name: 'Outdoor 60cm Dish Kit',
    category: 'Satellite Dishes',
    priceLkr: 18500,
    compareAtLkr: 21900,
    description:
      'Weather-ready dish kit with brackets and alignment accessories for reliable signal capture.',
    image:
      'https://images.unsplash.com/photo-1612810806546-ebbf22b9f0e2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1612810806546-ebbf22b9f0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1495121605193-b116b5b09a3b?auto=format&fit=crop&w=1200&q=80',
    ],
    badge: 'Best Seller',
    availability: 'In Stock',
    stockCount: 18,
    specs: ['60cm reflector', 'Rust-resistant mount', 'Signal alignment guide', 'Outdoor-grade finish'],
    featured: true,
    deal: 'On Sale',
  },
  {
    id: 3,
    slug: 'quad-lnb-premium',
    name: 'Quad LNB Premium',
    category: 'Cables & LNBs',
    priceLkr: 7900,
    description:
      'Reliable low-noise block converter with stable gain and multi-room support for connected homes.',
    image:
      'https://images.unsplash.com/photo-1518441902117-f0f8b4a9f4ae?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518441902117-f0f8b4a9f4ae?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=1200&q=80',
    ],
    badge: 'New Arrival',
    availability: 'In Stock',
    stockCount: 32,
    specs: ['Low-noise amplifier', 'Weather sealed', '4-output support', 'Universal fit'],
    featured: true,
  },
  {
    id: 4,
    slug: 'pro-installation-pack',
    name: 'Professional Installation Pack',
    category: 'Accessories',
    priceLkr: 5200,
    description:
      'A practical bundle with cable clips, fasteners, and technician-ready tools for a clean install.',
    image:
      'https://images.unsplash.com/photo-1565608087341-404b06b99a80?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1565608087341-404b06b99a80?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    ],
    badge: 'Bundle',
    availability: 'In Stock',
    stockCount: 24,
    specs: ['Cable clips', 'Wall plugs', 'Fasteners', 'Technician kit'],
    featured: true,
  },
];

export const SHOP_PRODUCTS: Product[] = [
  ...FEATURED_PRODUCTS,
  {
    id: 5,
    slug: 'single-tuner-hd-decoder',
    name: 'Single Tuner HD Decoder',
    category: 'Receivers / Decoders',
    priceLkr: 18900,
    compareAtLkr: 21900,
    description:
      'Entry-level HD decoder with smooth setup, dependable signal handling, and compact form factor.',
    image:
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    ],
    badge: 'On Sale',
    availability: 'In Stock',
    stockCount: 9,
    specs: ['HD output', 'Single tuner', 'USB playback', 'Remote included'],
    deal: 'On Sale',
  },
  {
    id: 6,
    slug: 'weatherproof-rg6-cable-30m',
    name: 'Weatherproof RG6 Cable 30m',
    category: 'Cables & LNBs',
    priceLkr: 4600,
    description:
      'Signal-grade cable spool for clean installations, built with thicker shielding and stable connectors.',
    image:
      'https://images.unsplash.com/photo-1581092918367-97f9a34d36d7?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581092918367-97f9a34d36d7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    ],
    availability: 'In Stock',
    stockCount: 40,
    specs: ['30 metre spool', 'Copper core', 'Weatherproof jacket', 'Shielded signal path'],
  },
  {
    id: 7,
    slug: 'signal-booster-amplifier',
    name: 'Signal Booster Amplifier',
    category: 'Accessories',
    priceLkr: 6900,
    compareAtLkr: 8500,
    description:
      'Helps maintain signal quality across longer cable runs and multi-room entertainment setups.',
    image:
      'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80',
    ],
    badge: 'Flash Deal',
    availability: 'In Stock',
    stockCount: 14,
    specs: ['Low-noise gain', 'Inline amplifier', 'Stable output', 'Easy install'],
    deal: 'Flash Sale',
  },
  {
    id: 8,
    slug: 'decoder-remote-pack',
    name: 'Decoder Remote Pack',
    category: 'Accessories',
    priceLkr: 2400,
    description:
      'Replacement remote pack for popular receiver models, with durable buttons and quick pairing.',
    image:
      'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=1200&q=80',
    ],
    availability: 'In Stock',
    stockCount: 27,
    specs: ['Spare remote pack', 'Quick pairing', 'Durable keypad', 'Battery included'],
  },
  {
    id: 9,
    slug: 'family-viewing-bundle',
    name: 'Family Viewing Bundle',
    category: 'Receivers / Decoders',
    priceLkr: 32900,
    compareAtLkr: 37900,
    description:
      'Receiver, dish, and cable bundle designed for households that want an all-in-one order.',
    image:
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526403221415-5b8e25fdf8b4?auto=format&fit=crop&w=1200&q=80',
    ],
    badge: 'Bundle',
    availability: 'In Stock',
    stockCount: 7,
    specs: ['Receiver + dish + cable', 'Home install ready', 'Best value bundle', 'Family viewing pack'],
    deal: 'On Sale',
  },
];

export const FLASH_DEALS: FlashDeal[] = [
  {
    title: 'HD Duo Receiver 4K',
    productSlug: 'hd-duo-receiver-4k',
    durationSeconds: 11565,
    note: 'Save LKR 5,000 before the flash sale ends.',
  },
  {
    title: 'Outdoor 60cm Dish Kit',
    productSlug: 'outdoor-60cm-dish-kit',
    durationSeconds: 42500,
    note: 'Weather-ready package with installation savings.',
  },
  {
    title: 'Signal Booster Amplifier',
    productSlug: 'signal-booster-amplifier',
    durationSeconds: 29110,
    note: 'Keep multi-room connections steady at a lower price.',
  },
];

export const CART_ITEMS: CartItem[] = [
  { product: FEATURED_PRODUCTS[0], quantity: 1 },
  { product: FEATURED_PRODUCTS[1], quantity: 2 },
  { product: FEATURED_PRODUCTS[2], quantity: 1 },
];

export const ORDER_HISTORY: OrderRecord[] = [
  { id: 'SSL-2048', date: '2026-07-22', status: 'Processing', totalLkr: 43200, items: 3 },
  { id: 'SSL-2037', date: '2026-07-17', status: 'Shipped', totalLkr: 18900, items: 1 },
  { id: 'SSL-2029', date: '2026-07-10', status: 'Delivered', totalLkr: 27600, items: 2 },
];

export const TRACKING_STEPS: TrackingStep[] = [
  { label: 'Pending', note: 'Order received and queued for processing.', completed: true },
  { label: 'Processing', note: 'Warehouse team is preparing your package.', completed: true },
  { label: 'Shipped', note: 'Courier pickup completed and tracking updated.', completed: false },
  { label: 'Delivered', note: 'Customer receives confirmation on successful handoff.', completed: false },
];

export const ADDRESS_BOOK: AddressBookItem[] = [
  {
    label: 'Primary Home',
    address: '44 Galle Road, Colombo 03, Western Province',
    phone: '+94 77 123 4567',
    primary: true,
  },
  {
    label: 'Secondary Store Pickup',
    address: '12/4 Station Road, Negombo, Western Province',
    phone: '+94 11 234 9988',
  },
];
