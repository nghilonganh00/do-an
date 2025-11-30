import { supabase } from "@/src/lib/supabaseClient";
import { User } from "@/src/types/users";

export const getMe = async (): Promise<User | null> => {
  const { data, error: userError } = await supabase
    .from("users")
    .select(`*`)
    .eq("id", 2)
    .single();

  const { count: totalOrders, error: orderError } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true });

  const { count: completedOrders, error: completedOrderError } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .eq("status", "completed");

  if (userError || orderError || completedOrderError) {
    console.error(
      "Fetch user error:",
      userError || orderError || completedOrderError
    );
    return null;
  }

  return {
    ...data,
    orderSummary: {
      totalOrders: totalOrders || 0,
      completedOrders: completedOrders || 0,
      pendingOrders: (totalOrders || 0) - (completedOrders || 0),
    },
  };
};
