import axiosInstance from "@/src/services/axiosInstance";
import { ProductVariant } from "@/src/types/product";

const getBestRatingProducts = async ({ limit }: { limit: number }): Promise<ProductVariant[] | null> => {
  const response = await axiosInstance.get("/products/best-ratings", { params: { limit } });
  return response.data ?? null;
};

export default getBestRatingProducts;
