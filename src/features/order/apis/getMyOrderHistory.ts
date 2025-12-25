import { supabase } from "@/src/lib/supabaseClient";
import { Params } from "@/src/types";
import { Order } from "@/src/types/order";

export const getMyOrderHistory = async ({ params }: { params?: Params }): Promise<{ data: Order[]; total: number }> => {
  const { page = 1, limit = 10 } = params || {};

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("orders")
    .select(`*`, { count: "exact" })
    .eq("userId", 2)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error(error);
    return { data: [], total: 0 };
  }

  return {
    data: data ?? [],
    total: count ?? 0,
  };
};
