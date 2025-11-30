import { supabase } from "@/src/lib/supabaseClient";
import { ShoppingCartItem } from "@/src/types/shoppingCart";
import { Product } from "@/src/types/product";

export const removeFromCart = async (cartItemId: number): Promise<any> => {
  const { data, error } = await supabase
    .from("shoppingCartItems")
    .delete()
    .eq("id", cartItemId)
    .select(
      `
      *,
      product:products(*)
    `
    );

  if (error) {
    console.error("Failed to remove from cart:", error);
    return null;
  }

  return data;
};
