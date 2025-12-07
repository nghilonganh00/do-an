import { supabase } from "@/src/lib/supabaseClient";
import { Coupon } from "@/src/types/coupon";

export const getAllCoupons = async (): Promise<Coupon[] | null> => {
  const { data, error } = await supabase.from("coupons").select("*"); 

  if (error) {
    console.error("Failed to fetch coupon:", error);
    return null;
  }

  return data ?? null;
};
