export type ProductCategory =
  | 'ALL'
  | 'PIPES'
  | 'VALVES'
  | 'PUMPS'
  | 'SANITARY';

export interface Product {
  id: string;
  sku: string;
  nameAm: string;
  specAm: string;
  category: Exclude<ProductCategory, 'ALL'>;
  categoryLabelAm: string;
  unitAm: string;
  priceEtb: number;
  inStock: boolean;
  stockCount: number;
  imageKey: 'ppr_pipes' | 'brass_valves' | 'water_pump' | 'mixer_faucet';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 'TELEBIRR' | 'CBE_BIRR' | 'CASH_ON_DELIVERY';

export interface CheckoutInput {
  customerName: string;
  phone: string;
  subCity: string;
  addressDetail: string;
  paymentMethod: PaymentMethod;
}

export interface OrderRecord {
  id: string;
  customerName: string;
  phone: string;
  subCity: string;
  addressDetail: string;
  paymentMethod: PaymentMethod;
  items: Array<{
    productId: string;
    nameAm: string;
    quantity: number;
    unitPriceEtb: number;
    lineTotalEtb: number;
  }>;
  subtotalEtb: number;
  deliveryFeeEtb: number;
  totalEtb: number;
  status: 'CONFIRMED';
  createdAt: string;
}

export type PropertyType = 'RESIDENTIAL' | 'COMMERCIAL' | 'INDUSTRIAL';

export interface BookingInput {
  serviceId: string;
  serviceTitleAm: string;
  propertyType: PropertyType;
  preferredDate: string;
  timeSlot: string;
  customerName: string;
  phone: string;
  subCity: string;
  notes?: string;
}

export interface BookingRecord extends BookingInput {
  id: string;
  status: 'SCHEDULED';
  createdAt: string;
}

export interface ContactInput {
  fullName: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ContactRecord extends ContactInput {
  id: string;
  createdAt: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  titleAm: string;
  summaryAm: string;
  deliverablesAm: string[];
  estimatedDurationAm: string;
  featured?: boolean;
}

export interface BlogArticle {
  id: string;
  titleAm: string;
  categoryAm: string;
  publishedDateAm: string;
  readTimeAm: string;
  excerptAm: string;
  paragraphsAm: string[];
  authorAm: string;
  imageKey: 'hero_plumbing' | 'site_engineer' | 'ppr_pipes';
}
