export interface Ingredient {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface HowToUseStep {
  step: number;
  title: string;
  description: string;
}

export interface ProductVariant {
  id: string;
  label: string; // e.g. "100g", "200g"
  price: number;
  mrp: number;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  shortDescription: string;
  description: string;
  price: number;
  mrp: number;
  discount: number; // percentage
  images: string[];
  ingredients: Ingredient[];
  benefits: Benefit[];
  howToUse: HowToUseStep[];
  category: string;
  stock: number;
  rating: number;
  reviewCount: number;
  variants: ProductVariant[];
  tags: string[];
}

export interface CartItem {
  productId: string;
  variantId?: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variantLabel?: string;
}

export interface OrderDetails {
  id: string;
  items: CartItem[];
  customer: CustomerInfo;
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

export interface CustomerInfo {
  fullName: string;
  mobileNumber: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
}
