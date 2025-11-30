import { supabase } from "@/src/lib/supabaseClient";
import { ProductVariantValue } from "@/src/types/product";
import { ShoppingCartItem } from "@/src/types/shoppingCart";

export const getMyShoppingCart = async (): Promise<ShoppingCartItem[]> => {
  const { data, error } = await supabase.from("shoppingCartItems").select(`
      *,
      variant:productVariants(*, product:products(*), variantValues:productVariantValues(*, optionValue:productOptionValues(*)))
    `);

  const cleanedData = data?.map((item) => ({
    ...item,
    variant: {
      ...item.variant,
      variantValues: item.variant.variantValues?.map(
        (variantValue: ProductVariantValue) => ({
          ...variantValue,
          optionValue: variantValue.optionValue,
        })
      ),
    },
  }));

  if (error) {
    console.error("Failed to fetch shopping cart:", error);
    return [];
  }

  return cleanedData ?? [];
};
