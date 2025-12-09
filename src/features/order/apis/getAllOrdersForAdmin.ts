import { Params } from "@/src/types";
import { Order } from "@/src/types/order";
import { ProductVariant } from "@/src/types/product";
import axios from "axios";

export interface GetAllOrdersForAdminParams extends Params {
  duration?: number;
}

const getAllOrdersForAdmin = async ({ params }: { params?: GetAllOrdersForAdminParams }): Promise<Order[]> => {
  const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/orders", { params });

  return response.data.data ?? [];
};

export default getAllOrdersForAdmin;
