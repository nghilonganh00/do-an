import { supabase } from "@/src/lib/supabaseClient";
import { Product } from "@/src/types/product";

interface GetProductsResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
}

export interface GetProductsForBrowerParams {
  page?: number;
  limit?: number;
  query?: string;
  sortBy?: string;
  sortDir?: string;
  categoryId?: number;
  priceTo?: number;
  priceFrom?: number;
  isSale?: boolean;
}

export const getProductsForBrower = async ({
  page = 1,
  limit = 10,
  query = "",
  sortBy = "created_at",
  sortDir = "desc",
  categoryId,
  priceTo,
  priceFrom,
  isSale = false,
}: GetProductsForBrowerParams): Promise<GetProductsResponse | null> => {
  const params: Record<string, any> = {
    page,
    limit_count: limit,
    search: query,
    sort_by: sortBy,
    sort_dir: sortDir,
    is_sale: isSale,
  };

  if (categoryId !== undefined) params.category_id = categoryId;
  if (priceFrom !== undefined) params.price_from = priceFrom;
  if (priceTo !== undefined) params.price_to = priceTo;

  const { data, error } = await supabase.rpc("get_products_for_browser", params);
  console.log("data: ", data);
  if (error) {
    console.error("🔥 Supabase RPC ERROR:", error);
    throw error;
  }

  return data as GetProductsResponse;
};
