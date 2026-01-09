import axiosInstance from "@/src/services/axiosInstance";

const chat = async (message: string): Promise<any> => {
  const response = await axiosInstance.post("/chatbot", { message });

  return response.data.data ?? [];
};

export default chat;
