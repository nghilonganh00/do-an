import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { ShoppingCartItem } from "@/src/types/shoppingCart";
import { addToCart } from "../apis/addToCart";

export const useAddToCart = (): UseMutationResult<
  ShoppingCartItem | null,
  Error,
  { productVariantId: number; quantity?: number }
> => {
  return useMutation({
    mutationFn: async ({ productVariantId, quantity = 1 }) =>
      addToCart(productVariantId, quantity),
  });
};
