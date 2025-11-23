import { supabase } from "@/src/lib/supabaseClient";
import { ShoppingCartItem } from "@/src/types/shoppingCart";
import { Product } from "@/src/types/product";

export const getMyShoppingCart = async (): Promise<ShoppingCartItem[]> => {
  const { data, error } = await supabase.from("shopping_cart_items").select(`
      *,
      product:products(*)
    `);

  if (error) {
    console.error("Failed to fetch shopping cart:", error);
    return [];
  }

  return data ?? [];
};
