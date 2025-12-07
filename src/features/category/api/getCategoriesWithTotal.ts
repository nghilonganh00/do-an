import { supabase } from "@/src/lib/supabaseClient";
import { getAllCategories } from "./getAllCategories";
import { Category } from "@/src/types/product";

export const getCategoriesWithTotal = async (): Promise<Category[]> => {
  const categories = await getAllCategories();

  const { data: products, error } = await supabase.from("products").select("categoryId");

  if (error) {
    console.error("Failed to fetch products:", error);
    return categories.map((cat) => ({ ...cat, totalProduct: 0 }));
  }

  const countMap =
    products?.reduce<Record<string, number>>((acc, prod) => {
      if (prod.categoryId) {
        acc[prod.categoryId] = (acc[prod.categoryId] || 0) + 1;
      }
      return acc;
    }, {}) ?? {};

  return categories.map((cat) => ({
    ...cat,
    totalProduct: countMap[cat?.id || 0] || 0,
  }));
};
