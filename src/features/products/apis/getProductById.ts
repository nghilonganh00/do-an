import { supabase } from "@/src/lib/supabaseClient";
import { Product } from "@/src/types/product";

export const getProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single();

  if (error) {
    console.error("Failed to fetch products:", error);
    return null;
  }

  return data ?? [];
};
