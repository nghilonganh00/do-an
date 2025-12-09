import { Params } from "@/src/types";
import { Payment } from "@/src/types/payment";
import axios from "axios";

const getAllPaymentsForAdmin = async ({ params }: { params?: Params }): Promise<Payment[]> => {
  const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/payments", { params });

  return response.data.data ?? [];
};

export default getAllPaymentsForAdmin;
