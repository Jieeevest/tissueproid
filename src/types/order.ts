import { Product } from './product';

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
export type PaymentMethod = 'CREDIT_CARD' | 'BANK_TRANSFER' | 'PAYPAL' | 'CASH_ON_DELIVERY';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product?: Product;
  quantity: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  invoice?: Invoice;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Invoice {
  id: string;
  orderId: string;
  order?: Order;
  invoiceNumber: string;
  amount: number;
  issuedDate: Date;
  dueDate: Date;
  paidDate?: Date | null;
  paymentStatus: PaymentStatus;
  createdAt?: Date;
  updatedAt?: Date;
}