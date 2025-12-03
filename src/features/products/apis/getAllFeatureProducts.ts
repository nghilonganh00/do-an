import { supabase } from "@/src/lib/supabaseClient";
import { ProductVariant } from "@/src/types/product";

export const getAllFeatureProducts = async (): Promise<ProductVariant[] | null> => {
  const { data, error } = await supabase.from("products").select("*, variants:productVariants(*)", { count: "exact" });

  if (error) {
    console.error("Failed to fetch products:", error);
    return null;
  }

  return data ?? [];
};
