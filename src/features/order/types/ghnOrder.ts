import { ORDER_STATUS } from "@/src/constants";

export type GHNOrder = {
  log?: {
    status: ORDER_STATUS;
    updated_date: string;
  }[];
};
