import { supabase } from "@/src/lib/supabaseClient";

export const getAllCategories = async () => {
  const { data, error } = await supabase.from("categories").select("id, name, image");

  return data;
};
