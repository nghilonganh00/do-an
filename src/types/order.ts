import { BaseEntity } from ".";
import { Feedback } from "./feedback";
import { Payment } from "./payment";
import { ProductVariant } from "./product";
import { User } from "./users";

export interface Shipment extends BaseEntity {
  id: number;
  fullName?: string;
  companyName?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  phone?: string;
  email?: string;
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
  payments?: Payment;
  orderCoupons?: orderCoupon[];
  orderItems?: OrderItem[];
  user?: User;
}
