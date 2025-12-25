import axios from "axios";

const chat = async (message: string): Promise<any> => {
  const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/chatbot", { message });

  return response.data.data ?? [];
};

export default chat;
