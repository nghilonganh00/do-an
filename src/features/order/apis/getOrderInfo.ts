import axiosInstance from "@/src/services/axiosInstance";
import { GHNOrder } from "../types/ghnOrder";

export const getOrderInfo = async (orderCode: string): Promise<GHNOrder> => {
  const response = await axiosInstance.get(`/orders/code/${orderCode}`);
  return response.data.data;
};
