import { supabase } from "@/src/lib/supabaseClient";
import { User } from "@/src/types/users";

export const getMe = async (): Promise<User | null> => {
  const { data, error } = await supabase.from("users").select(`*`).eq("id", 1).single();

  if (error) {
    console.error("Fetch user error:", error);
    return null;
  }

  return data;
};
