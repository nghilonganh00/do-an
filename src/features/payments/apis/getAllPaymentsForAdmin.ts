import { PAYMENT_STATUS } from "@/src/constants";
import { Params } from "@/src/types";
import { Payment } from "@/src/types/payment";
import axios from "axios";

export type PaymentParams = Params & {
  status?: PAYMENT_STATUS | null;
};

const getAllPaymentsForAdmin = async ({ params }: { params?: PaymentParams }): Promise<Payment[]> => {
  const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/payments", { params });

  return response.data.data ?? [];
};

export default getAllPaymentsForAdmin;
