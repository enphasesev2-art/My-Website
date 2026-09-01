export const formatPrice = (price: number): string =>
  `₹${price.toLocaleString('en-IN')}`;

export const generateOrderId = (): string =>
  'AHP-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();

export const calcDiscount = (mrp: number, price: number): number =>
  Math.round(((mrp - price) / mrp) * 100);
