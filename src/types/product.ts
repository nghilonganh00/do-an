import { BaseEntity } from ".";
import { OrderItem } from "./order";

export type Category = {
  id: number;
  name?: string;
  image?: string;
  totalProduct?: number;
  products?: Product[];
};

export interface Product extends BaseEntity {
  id: number;
  name?: string;
  images?: string[];
  stars?: number;
  description?: string;
  categoryId?: number;
  category?: Category;
  variants?: ProductVariant[];
  feedbackCount?: number;
}

export interface ProductVariant {
  id: number;
  productId?: number;
  variantName?: string;
  sku?: string;
  price?: number;
  originalPrice?: number;
  stock?: number;
  thumbnail?: string;
  feedbackCount?: number;
  product?: Product;
  orderItems?: OrderItem[];
}
