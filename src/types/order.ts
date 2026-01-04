import { BaseEntity } from ".";
import { Feedback } from "./feedback";
import { Payment } from "./payment";
import { ProductVariant } from "./product";
import { User } from "./users";

export interface Shipment extends BaseEntity {
  id: number;
  fullName?: string;
  address?: string;
  phone?: string;
  email?: string;
  provinceId?: number;
  districtId?: number;
  wardCode?: string;
}

export type orderCoupon = {
  id: number;
};

export type OrderItem = {
  id: number;
  productVariantId?: number;
  quantity?: number;
  productVariant?: ProductVariant;
  feedback?: Feedback;
};
export interface Order extends BaseEntity {
  id: number;
  status?: string;
  totalAmount?: number;
  discount?: number;
  shipmentId?: number;
  paymentId?: number;
  shipment?: Shipment;
  payment?: Payment;
  orderCoupons?: orderCoupon[];
  orderItems?: OrderItem[];
  user?: User;
  code?: string;
}
