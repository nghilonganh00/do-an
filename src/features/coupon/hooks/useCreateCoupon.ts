import { useMutation } from "@tanstack/react-query";
import createCoupon from "../apis/createCoupon";
import { Coupon } from "@/src/types/coupon";

export const useCreateCoupon = () => {
  return useMutation({
    mutationFn: (coupon: Coupon) => createCoupon(coupon),

    onError: (error: Error) => {
      console.error("Error recognize food image:", error);
    },
  });
};
