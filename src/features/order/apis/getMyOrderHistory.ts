import axiosInstance from "@/src/services/axiosInstance";
import { Params } from "@/src/types";
import { Order } from "@/src/types/order";

export const getMyOrderHistory = async ({ params }: { params?: Params }): Promise<{ data: Order[]; total: number }> => {
  const { page = 1, limit = 10 } = params || {};

  const response = await axiosInstance.get(`/orders/me`, { params: { page, limit } });
  return {
    data: response.data.data,
    total: 49,
  };
};
