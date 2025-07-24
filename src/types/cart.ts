import { Product } from './product';

export interface CartItem {
  id: string;
  productId: string;
  product?: Product;
  quantity: number;
  cartId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  createdAt?: Date;
  updatedAt?: Date;
}