import axiosInstance from "@/src/services/axiosInstance";
import { ProductVariant } from "@/src/types/product";

const getHotSalesProducts = async ({ limit }: { limit: number }): Promise<ProductVariant[] | null> => {
  const response = await axiosInstance.get("/products/hot-sales", { params: { limit } });
  return response.data ?? null;
};

export default getHotSalesProducts;
