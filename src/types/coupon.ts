import { DISCOUNT_TYPE } from "../constants";
import { orderCoupon } from "./order";

export type Coupon = {
  id?: number;
  code?: string;
  discountType?: DISCOUNT_TYPE;
  discountValue?: number;
  usageLimit?: number;
  usedCount?: number;
  validFrom?: string;
  validTo?: string;
  active?: boolean;
  description?: string;
  orderCoupons?: orderCoupon[];
};
