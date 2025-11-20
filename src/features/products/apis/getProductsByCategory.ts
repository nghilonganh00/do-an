import { supabase } from "@/src/lib/supabaseClient";
import { Product } from "@/src/types/product";

export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  const { data, error } = await supabase.from("products").select("*").eq("category_id", categoryId); // filter theo categoryId

  if (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }

  return data ?? [];
};
