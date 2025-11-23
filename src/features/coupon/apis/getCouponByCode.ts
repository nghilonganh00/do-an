import { supabase } from "@/src/lib/supabaseClient";
import { Coupon } from "@/src/types/coupon";

export const getCouponByCode = async (code: string): Promise<Coupon | null> => {
  const trimmedCode = code.trim();

  const { data, error } = await supabase.from("coupons").select("*").eq("code", trimmedCode).maybeSingle(); // trả về null nếu không tìm thấy

  if (error) {
    console.error("Failed to fetch coupon:", error);
    return null;
  }

  return data ?? null;
};
