import { ProductVariant } from "./product";

export type ShoppingCartItem = {
  id: number;
  user_id?: number;
  productVariantId?: number;
  quantity?: number;
  variant?: ProductVariant;
};
