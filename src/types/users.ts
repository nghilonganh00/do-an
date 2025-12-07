import { Order, Payment } from "./order";

export type User = {
  id: number;
  provinceId?: number;
  districtId?: number;
  wardId?: number;
  name?: string;
  avatar?: string;
  email?: string;
  password?: string;
  phone?: string;
  companyName?: string;
  address?: string;
  country?: string;
  state?: string;
  city?: string;
  zipCode?: string;
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
