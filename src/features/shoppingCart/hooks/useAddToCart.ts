import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { ShoppingCartItem } from "@/src/types/shoppingCart";
import { Product } from "@/src/types/product";
import { addToCart } from "../apis/addToCart";

export const useAddToCart = (): UseMutationResult<
  (ShoppingCartItem & { product: Product }) | null,
  Error,
  { productId: number; quantity?: number }
> => {
  return useMutation({
    mutationFn: async ({ productId, quantity = 1 }) => addToCart(productId, quantity),
  });
};
