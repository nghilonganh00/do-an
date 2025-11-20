import { supabase } from "@/src/lib/supabaseClient";
import { Category } from "@/src/types/product";

export const updateCategoryById = async (
  categoryId: string,
  data: { name?: string; image?: string }
): Promise<Category> => {
  const { data: updatedCategory, error: updateError } = await supabase
    .from("categories")
    .update(data)
    .eq("id", categoryId)
    .select()
    .single();

  if (updateError || !updatedCategory) {
    console.error("Failed to update category:", updateError);
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
    ...updatedCategory,
    products: productsData ?? [],
  };
};
