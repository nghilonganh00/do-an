import { Params } from "@/src/types";
import { Payment } from "@/src/types/payment";
import { ProductVariant } from "@/src/types/product";
import axios from "axios";

export interface GetBestSellingProductParams extends Params {
  duration?: number;
}

const getAllBestSellingProductVariant = async ({
  params,
}: {
  params?: GetBestSellingProductParams;
}): Promise<ProductVariant[]> => {
  const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/products/best-selling", { params });

  return response.data.data ?? [];
};

export default getAllBestSellingProductVariant;
