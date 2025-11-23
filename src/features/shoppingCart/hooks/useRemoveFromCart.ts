import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { ShoppingCartItem } from "@/src/types/shoppingCart";
import { Product } from "@/src/types/product";
import { removeFromCart } from "../apis/removeToCart";

export const useRemoveFromCart = (): UseMutationResult<ShoppingCartItem | null, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartItemId: number) => removeFromCart(cartItemId),

    onSuccess: (_, cartItemId) => {
      //   queryClient.invalidateQueries({ queryKey: ["shopping-cart"] });

      queryClient.setQueryData(["shopping-cart"], (oldData: ShoppingCartItem[]) => {
        if (!oldData) return oldData;

        return oldData.filter((item: ShoppingCartItem) => item.id !== cartItemId);
      });
    },
  });
};
