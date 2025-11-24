import { supabase } from "@/src/lib/supabaseClient";
import { Params } from "@/src/types";
import { Product } from "@/src/types/product";

interface GetProductsResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
}

export const getAllProducts = async ({
  page = 1,
  limit = 10,
  query = "",
  sortBy = "created_at",
  sortDir = "desc",
}: Params): Promise<GetProductsResponse | null> => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let builder = supabase.from("products").select("*", { count: "exact" });

  // Search theo tên sản phẩm
  if (query) {
    builder = builder.ilike("name", `%${query}%`);
  }

  // Sort
  if (sortBy) {
    builder = builder.order(sortBy, { ascending: sortDir === "asc" });
  }

  const { data, error, count } = await builder.range(from, to);

  if (error) {
    console.error("Failed to fetch products:", error);
    return null;
  }

  return {
    data: data ?? [],
    total: count ?? 0,
    page,
    limit,
  };
};
