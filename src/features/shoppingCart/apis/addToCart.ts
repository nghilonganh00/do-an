import { supabase } from "@/src/lib/supabaseClient";
import { ShoppingCartItem } from "@/src/types/shoppingCart";

export const addToCart = async (
  productVariantId: number,
  quantity: number = 1
): Promise<ShoppingCartItem | null> => {
  const { data, error } = await supabase
    .from("shoppingCartItems")
    .insert({
      productVariantId: productVariantId,
      quantity,
      userId: 2,
    })
    .single();

  if (error) {
    console.error("Failed to add to cart:", error);
    return null;
  }

  return data;
};
