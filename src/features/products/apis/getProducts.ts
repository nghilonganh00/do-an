import { supabase } from "@/src/lib/supabaseClient";

interface GetProductsProps {
  topLimit?: number; // số lượng sản phẩm top stars
  latestLimit?: number; // số lượng sản phẩm mới nhất
}

export const getProducts = async (props: GetProductsProps = {}) => {
  const topLimit = props.topLimit ?? 10;
  const latestLimit = props.latestLimit ?? 10;

  // Lấy top sản phẩm theo stars
  const { data: topRated, error: errorTop } = await supabase
    .from("products")
    .select("id, name, price, image, category_id, stars")
    .order("stars", { ascending: false })
    .limit(topLimit);

  if (errorTop) {
    console.error("Error fetching top rated products:", errorTop);
  }

  // Lấy sản phẩm mới nhất
  const { data: latest, error: errorLatest } = await supabase
    .from("products")
    .select("id, name, price, category_id, stars, created_at")
    .order("created_at", { ascending: false })
    .limit(latestLimit);

  if (errorLatest) {
    console.error("Error fetching latest products:", errorLatest);
  }

  return { topRated: topRated ?? [], latest: latest ?? [] };
};
