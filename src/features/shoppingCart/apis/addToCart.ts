import { supabase } from "@/src/lib/supabaseClient";
import { ShoppingCartItem } from "@/src/types/shoppingCart";
import { Product } from "@/src/types/product";

export const addToCart = async (
  productId: number,
  quantity: number = 1
): Promise<(ShoppingCartItem & { product: Product }) | null> => {
  const { data, error } = await supabase
    .from("shopping_cart_items")
    .insert({
      productId: productId,
      quantity,
      userId: 1,
    })
    .select(
      `
      *,
      product:products(*)
    `
    )
    .single();

  if (error) {
    console.error("Failed to add to cart:", error);
    return null;
  }

  return data;
};
