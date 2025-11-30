import { supabase } from "@/src/lib/supabaseClient";
import { Product, ProductVariant } from "@/src/types/product";

export const getAllFeatureProducts = async (): Promise<ProductVariant[] | null> => {
  const { data, error } = await supabase.from("productVariants").select("*", { count: "exact" });

  if (error) {
    console.error("Failed to fetch products:", error);
    return null;
  }

  return data ?? [];
};
