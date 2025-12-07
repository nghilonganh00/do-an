import { supabase } from "@/src/lib/supabaseClient";
import { User } from "@/src/types/users";

export const getCustomerByIdForAdmin = async (userId: number): Promise<User | null> => {
  const { data, error } = await supabase
    .from("users")
    .select(
      `
      *,
      orders:orders(*),
      payments:payments(*)
    `
    )
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }

  return data;
};
