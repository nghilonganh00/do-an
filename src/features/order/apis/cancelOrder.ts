import { Order } from "@/src/types/order";
import axios from "axios";

const cancelOrder = async ({ orderCode }: { orderCode: string }): Promise<Order[]> => {
  const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/orders/cancel/${orderCode}`);

  return response.data.data ?? [];
};

export default cancelOrder;
