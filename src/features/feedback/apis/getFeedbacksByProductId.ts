import axiosInstance from "@/src/services/axiosInstance";
import { Feedback } from "@/src/types/feedback";

export const getFeedbacksByProductId = async (productId: number): Promise<Feedback[]> => {
  const response = await axiosInstance.get(`/feedbacks/product/${productId}`);
  return response.data.data;
};
