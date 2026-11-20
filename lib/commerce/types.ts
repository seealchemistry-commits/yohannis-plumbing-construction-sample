export type ProductCategory =
  | 'ALL'
  | 'PIPES'
  | 'VALVES'
  | 'PUMPS'
  | 'SANITARY';

export type ProductSize = '1/2"' | '3/4"' | '1"';

export const PRODUCT_SIZES: readonly ProductSize[] = ['1/2"', '3/4"', '1"'];

export interface Product {
  id: string;
  sku: string;
  nameAm: string;
  specAm: string;
  category: Exclude<ProductCategory, 'ALL'>;
  categoryLabelAm: string;
  unitAm: string;
  priceEtb: number;
  sizePricesEtb: Record<ProductSize, number>;
  availableSizes: ProductSize[];
  inStock: boolean;
  stockCount: number;
  imageKey:
    | 'ppr_pipes'
    | 'brass_valves'
    | 'water_pump'
    | 'mixer_faucet'
    | 'pvc_fittings_kit'
    | 'brass_fittings_board';
}

export interface CartItem {
  product: Product;
  size: ProductSize;
  quantity: number;
}

export type PaymentMethod = 'TELEBIRR' | 'CBE_BIRR' | 'CASH_ON_DELIVERY';

export interface CheckoutInput {
  customerName: string;
  phone: string;
  subCity: string;
  woreda: string;
  neighborhood: string;
  specificLandmark?: string;
  paymentMethod: PaymentMethod;
}

export interface OrderRecord {
  id: string;
  customerName: string;
  phone: string;
  subCity: string;
  woreda: string;
  neighborhood: string;
  specificLandmark?: string;
  paymentMethod: PaymentMethod;
  items: Array<{
    productId: string;
    nameAm: string;
    size: ProductSize;
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
  woreda: string;
  neighborhood: string;
  specificLandmark?: string;
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

export interface NotifyRequestInput {
  serviceId: string;
  serviceTitleAm: string;
  customerName: string;
  phone: string;
}

export interface NotifyRequestRecord extends NotifyRequestInput {
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

export interface ComingSoonService {
  id: string;
  titleAm: string;
  subtitleEn: string;
  summaryAm: string;
  expectedLaunchAm: string;
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
  imageKey: 'hero_plumbing' | 'site_engineer' | 'ppr_pipes' | 'pipes_showcase';
}
