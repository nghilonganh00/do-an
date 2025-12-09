import { Coupon } from "@/src/types/coupon";
import axios from "axios";

const createCoupon = async (coupon: Coupon): Promise<Coupon> => {
  const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/coupons", { ...coupon });

  return response.data.data ?? [];
};

export default createCoupon;
