import { useMutation } from "@tanstack/react-query";
import chat from "../apis/chat";

export const useChat = () => {
  return useMutation({
    mutationFn: (message: string) => chat(message),

    onError: (error: Error) => {
      console.error("Error recognize food image:", error);
    },
  });
};
