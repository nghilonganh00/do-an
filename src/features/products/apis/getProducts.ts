import { supabase } from "@/src/lib/supabaseClient";
import { Product } from "@/src/types/product";

interface GetProductsProps {
  topLimit?: number;
  latestLimit?: number;
  categoryId?: string;
}

export const getProducts = async (props: GetProductsProps = {}): Promise<Product[]> => {
  const topLimit = props.topLimit ?? 10;
  const latestLimit = props.latestLimit ?? 10;
  const { categoryId } = props;

  // --- Top rated products ---
  let queryTop = supabase.from("products").select("*").order("stars", { ascending: false }).limit(topLimit);
  if (categoryId) queryTop = queryTop.eq("category_id", categoryId);
  const { data: topRated, error: errorTop } = await queryTop;
  if (errorTop) console.error("Error fetching top rated products:", errorTop);

  // --- Latest products ---
  let queryLatest = supabase.from("products").select("*").order("created_at", { ascending: false }).limit(latestLimit);
  if (categoryId) queryLatest = queryLatest.eq("category_id", categoryId);
  const { data: latest, error: errorLatest } = await queryLatest;
  if (errorLatest) console.error("Error fetching latest products:", errorLatest);

  // --- Merge arrays và loại bỏ trùng (nếu muốn) ---
  const allProducts = [...(topRated ?? []), ...(latest ?? [])];

  // Nếu muốn loại trùng theo id
  const uniqueProducts = Array.from(new Map(allProducts.map((p) => [p.id, p])).values());

  return uniqueProducts;
};
