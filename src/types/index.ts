export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'rings' | 'necklaces' | 'earrings' | 'bracelets';
  images: string[];
  inStock: boolean;
  featured: boolean;
  rating: number;
  reviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchase?: number;
  maxDiscount?: number;
  expiresAt: Date;
  usageLimit?: number;
  usedCount: number;
  active: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  discount: number;
  couponCode?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}
