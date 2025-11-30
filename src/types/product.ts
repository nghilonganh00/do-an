export type Category = {
  id?: number;
  name?: string;
  image?: string;
  totalProduct?: number;
  products?: Product[];
};

export type Product = {
  id?: number;
  name?: string;
  images?: string[];
  stars?: number;
  category_id?: number;
  category?: Category;
  variants?: ProductVariant[];
};

export interface ProductVariant {
  id: number;
  productId?: number;
  sku?: string;
  price?: number;
  originalPrice?: number;
  stock?: number;
  thumbnail?: string;
  product?: Product;
  variantValues?: ProductVariantValue[];
}

export interface ProductVariantValue {
  id: number;
  variantId?: number;
  optionValueId?: number;
  variant?: ProductVariant;
  optionValue?: ProductOptionValue;
}

export interface ProductOption {
  id: number;
  productId?: number;
  name?: string;
}

export interface ProductOptionValue {
  id: number;
  optionId?: number;
  value?: string;
  option?: ProductOption;
}
