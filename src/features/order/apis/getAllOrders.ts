import { ORDER_STATUS } from "@/src/constants";
import { supabase } from "@/src/lib/supabaseClient";
import { Params } from "@/src/types";
import { Order } from "@/src/types/order";

interface GetOrdersResponse {
  data: Order[];
  total: number;
  page: number;
  limit: number;
}

export const getAllOrders = async ({
  page = 1,
  limit = 10,
  sortBy = "created_at",
  sortDir = "desc",
  status,
  search,
}: Params): Promise<GetOrdersResponse | null> => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let builder = supabase.from("orders").select(
    `
      *,
      user:userId(*),
      shipments:shipmentId (*),
      payments (*)
    `,
    { count: "exact" }
  );

  if (status) {
    builder = builder.eq("status", status);
  }

  if (search?.trim()) {
    const keyword = `%${search.trim()}%`;

    builder = builder.or(`code.ilike.${keyword}`);
  }

  if (sortBy) {
    builder = builder.order(sortBy, { ascending: sortDir === "asc" });
  }

  const { data, error, count } = await builder.range(from, to);

  if (error) {
    console.error("Failed to fetch my order history:", error);
    return null;
  }

  return {
    data: data ?? [],
    total: count ?? 0,
    page,
    limit,
  };
};
