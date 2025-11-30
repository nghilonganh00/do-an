import { BaseEntity } from ".";
import { PAYMENT_STATUS } from "../constants";
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

export interface Payment extends BaseEntity {
  id: number;
  orderId?: number;
  amount?: number;
  method?: string;
  status?: PAYMENT_STATUS;
  transactionId?: number;
  paidAt?: string;
}

export type orderCoupon = {
  id: number;
};

export type OrderItem = {
  id: number;
  productVariantId?: number;
  quantity?: number;
  productVariant?: ProductVariant;
};
export interface Order extends BaseEntity {
  id: number;
  status?: string;
  totalAmount?: number;
  discount?: number;
  shipmentId?: number;
  paymentId?: number;
  shipment?: Shipment;
  payments?: Payment[];
  orderCoupons?: orderCoupon[];
  orderItems?: OrderItem[];
  user?: User;
}
