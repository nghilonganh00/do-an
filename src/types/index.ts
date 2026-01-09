import { ORDER_STATUS } from "../constants";

export type TabItem = {
  label: string;
  value: string | number | null;
};

export interface BaseEntity {
  id: number;
  created_at?: string;
  updated_at?: string;
}

export interface Params {
  page?: number;
  limit?: number;
  query?: string;
  sortBy?: string;
  sortDir?: "asc" | "desc";
  status?: ORDER_STATUS;
  search?: string;
}
