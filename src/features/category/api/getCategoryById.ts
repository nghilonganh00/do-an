import { supabase } from "@/src/lib/supabaseClient";
import { Category } from "@/src/types/product";

export const getCategoryById = async (categoryId: string): Promise<Category> => {
  const { data: categoryData, error: categoryError } = await supabase
    .from("categories")
    .select("*")
    .eq("id", categoryId)
    .single();

  if (categoryError || !categoryData) {
    console.error("Failed to fetch category:", categoryError);
    return {};
  }

  const { data: productsData, error: productsError } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", categoryId);

  if (productsError) {
    console.error("Failed to fetch products:", productsError);
  }

  return {
    ...categoryData,
    products: productsData ?? [],
  };
};
