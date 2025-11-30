import { supabase } from "@/src/lib/supabaseClient";
import { Order } from "@/src/types/order";

export const getMyOrderHistory = async (): Promise<Order[] | null> => {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *
    `
    )
    .eq("userId", 2);

  if (error) {
    console.error("Failed to fetch my order history:", error);
    return null;
  }

  return data ?? null;
};
