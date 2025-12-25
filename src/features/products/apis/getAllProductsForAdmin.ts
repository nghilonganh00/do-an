import { supabase } from "@/src/lib/supabaseClient";
import { Params } from "@/src/types";
import { OrderItem } from "@/src/types/order";
import { Product, ProductVariant } from "@/src/types/product";

interface GetProductsResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
}

export interface GetProductsForAdminParams extends Params {
  categoryId?: number;
}

export const getAllProductsForAdmin = async ({
  page = 1,
  limit = 10,
  query = "",
  sortBy = "created_at",
  sortDir = "desc",
  categoryId,
}: GetProductsForAdminParams): Promise<GetProductsResponse | null> => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  console.log("categoryId: ", categoryId);

  let builder = supabase
    .from("products")
    .select("*, variants:productVariants(*, orderItems (id, feedbacks: feedbacks(id)))", { count: "exact" });

  if (query) {
    builder = builder.ilike("name", `%${query}%`);
  }

  if (sortBy) {
    builder = builder.order(sortBy, { ascending: sortDir === "asc" });
  }

  if (categoryId) {
    builder = builder.eq("categoryId", categoryId);
  }

  const { data, error, count } = await builder.range(from, to);

  if (error) {
    console.error("Failed to fetch products:", error);
    return null;
  }

  const products = data.map((p) => {
    let feedbackCount = 0;
    let soldCount = 0;

    p.variants?.forEach((v: ProductVariant) => {
      v.orderItems?.forEach((o: OrderItem) => {
        const rating = o.feedback?.rating || 0;
        feedbackCount += rating;
        soldCount += o.quantity || 0;
      });
    });

    return {
      ...p,
      feedbackCount,
      soldCount,
    };
  });

  return {
    data: products,
    total: count ?? 0,
    page,
    limit,
  };
};
