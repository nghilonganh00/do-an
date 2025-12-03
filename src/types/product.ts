export type Category = {
  id: number;
  name?: string;
  image?: string;
  totalProduct?: number;
  products?: Product[];
};

export type Product = {
  id: number;
  name?: string;
  images?: string[];
  stars?: number;
  description?: string;
  categoryId?: number;
  category?: Category;
  variants?: ProductVariant[];
};

export interface ProductVariant {
  id: number;
  productId?: number;
  variantName?: string;
  sku?: string;
  price?: number;
  originalPrice?: number;
  stock?: number;
  thumbnail?: string;
  product?: Product;
}
