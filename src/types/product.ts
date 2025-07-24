export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  category?: {
    id: string;
    name: string;
  };
  featured: boolean;
  rating: number;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  id: string;
  name: string;
  products?: Product[];
  createdAt?: Date;
  updatedAt?: Date;
}