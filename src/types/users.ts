import { Order } from "./order";
import { Payment } from "./payment";

export type User = {
  id: number;
  provinceId?: number;
  districtId?: number;
  wardCode?: string;
  name?: string;
  avatar?: string;
  email?: string;
  password?: string;
  phone?: string;
  companyName?: string;
  address?: string;
  token: string;
  created_at?: string;
  orderSummary?: {
    totalOrders: number;
    pendingOrders?: number;
    completedOrders?: number;
  };
  orders?: Order[];
  payments?: Payment[];
};
