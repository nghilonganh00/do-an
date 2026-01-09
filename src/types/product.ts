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
  categoryId?: number;
  name?: string;
  images?: string[];
  stars?: number;
  viewCount?: number;
  orderCount?: number;
  description?: string;
  metaDescription?: string;
  category?: Category;
  variants?: ProductVariant[];
  feedbackCount?: number;
  soldCount?: number;
  main_price?: number;
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
  soldcount?: number;
  product?: Product;
  orderItems?: OrderItem[];
}
