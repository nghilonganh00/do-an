"use client";

import { useMutation } from "@tanstack/react-query";
import { deleteProductById } from "../apis/deleteProduct";

export const useDeleteProductById = () => {
  return useMutation({
    mutationFn: (id: number) => {
      if (!id) throw new Error("Product ID is required");
      return deleteProductById(id);
    },
    onSuccess: () => {},
  });
};
