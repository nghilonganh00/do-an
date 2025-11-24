export type TabItem = {
  label: string;
  value: string | number | null;
};

export interface BaseEntity {
  id: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Params {
  page?: number;
  limit?: number;
  query?: string;
  sortBy?: string;
  sortDir?: "asc" | "desc";
}
