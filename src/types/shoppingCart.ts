import { Product } from "./product";

export type ShoppingCartItem = {
  id?: number;
  user_id?: number;
  product_id?: number;
  quantity?: number;
  product?: Product;
};
