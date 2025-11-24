import { BaseEntity } from ".";
import { ORDER_STATUS, PAYMENT_STATUS } from "../constants";
import { Product } from "./product";
import { User } from "./users";

export type Shipment = {
  id: number;
};

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
  productId?: number;
  quantity?: number;
  product?: Product;
};
export interface Order extends BaseEntity {
  id: number;
  status?: string;
  totalAmount?: number;
  shipmentId?: number;
  paymentId?: number;
  shipment?: Shipment;
  payments?: Payment[];
  orderCoupons?: orderCoupon[];
  orderItems?: OrderItem[];
  user?: User;
}
