import { Product } from 'use-shopping-cart'

export const shippingOptions: Product[] = [
  {
    name: 'Shipping',
    description: 'Royal Mail Special Delivery (Next Day by 1pm)',
    price: 700,
    currency: 'GBP',
    sku: 'shipping-next-day',
  },
  {
    name: 'Shipping',
    description:
      'Royal Mail Tracked 48 (Usually arrives in three working days)',
    price: 500,
    currency: 'GBP',
    sku: 'shipping-48',
  },
  {
    name: 'Shipping',
    description: 'International (Shipping times vary by country)',
    price: 1000,
    currency: 'GBP',
    sku: 'shipping-international',
  },
]
