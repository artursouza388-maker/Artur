import { Coupon } from '../types';

export const coupons: Coupon[] = [
  {
    id: 'welcome10',
    code: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10,
    minPurchase: 199,
    expiresAt: new Date('2025-12-31'),
    usageLimit: 1000,
    usedCount: 45,
    active: true
  },
  {
    id: 'save50',
    code: 'SAVE50',
    discountType: 'fixed',
    discountValue: 50,
    minPurchase: 299,
    expiresAt: new Date('2025-06-30'),
    usageLimit: 500,
    usedCount: 23,
    active: true
  },
  {
    id: 'vip20',
    code: 'VIP20',
    discountType: 'percentage',
    discountValue: 20,
    minPurchase: 500,
    maxDiscount: 200,
    expiresAt: new Date('2025-03-31'),
    usageLimit: 100,
    usedCount: 12,
    active: true
  },
  {
    id: 'first25',
    code: 'FIRST25',
    discountType: 'percentage',
    discountValue: 25,
    minPurchase: 399,
    maxDiscount: 150,
    expiresAt: new Date('2025-08-31'),
    usageLimit: 200,
    usedCount: 8,
    active: true
  }
];
