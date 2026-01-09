import { BaseEntity } from ".";
import { PAYMENT_STATUS } from "../constants";
import { User } from "./users";

export interface Payment extends BaseEntity {
  id: number;
  userId?: number;
  amount?: number;
  method?: string;
  status?: PAYMENT_STATUS;
  url?: string;
  transactionId?: number;
  paidAt?: string;
  user?: User;
}
