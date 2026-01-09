import axiosInstance from "@/src/services/axiosInstance";
import { Product } from "@/src/types/product";

export const getProductById = async (id: string): Promise<Product | null> => {
  const response = await axiosInstance.get(`/products/${id}`);

  const data = response.data.data;

  return data ?? null;
};
