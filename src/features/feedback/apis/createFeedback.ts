import axiosInstance from "@/src/services/axiosInstance";

export const createFeedback = async (newFeedback: { orderItemId: number; rating: number; comment: string }) => {
  try {
    const response = await axiosInstance.post("/feedbacks", newFeedback);
    return response.data.data;
  } catch (error) {
    console.log("Create Feedback Failed: ", error);
    return null;
  }
};
