import { useMutation } from "@tanstack/react-query";
import { updateCategoryById } from "../api/updateCategory";

export const useUpdateCategory = () => {
  return useMutation({
    mutationFn: ({ categoryId, data }: { categoryId: string; data: { name?: string; image?: string } }) =>
      updateCategoryById(categoryId, data),

    onError: (error: Error) => {
      console.error("Error recognize food image:", error);
    },
  });
};
