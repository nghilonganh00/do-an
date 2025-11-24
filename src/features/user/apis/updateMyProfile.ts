import { supabase } from "@/src/lib/supabaseClient";
import { User } from "@/src/types/users";

export const updateMyProfile = async (
  userId: number,
  payload: Partial<User>
): Promise<User | null> => {
  const { data, error } = await supabase
    .from("users")
    .update(payload)
    .eq("id", userId)
    .select("*")
    .single();

  if (error) {
    console.error("Update user error:", error);
    return null;
  }

  return data;
};
