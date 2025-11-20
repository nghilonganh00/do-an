import { supabase } from "@/src/lib/supabaseClient";
import { Category } from "@/src/types/product";

export const getAllCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase.from("categories").select("id, name, image");

  if (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }

  return data ?? [];
};
