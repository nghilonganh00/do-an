import { Product } from "./product";

export type ShoppingCartItem = {
  id: number;
  user_id?: number;
  productId?: number;
  quantity?: number;
  product?: Product;
};
