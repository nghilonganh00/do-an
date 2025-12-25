import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../apis/createProduct";
import { CreateProduct } from "../types";

const useCreateProduct = () => {
  return useMutation({
    mutationFn: async (data: CreateProduct) => createProduct(data),
  });
};

export default useCreateProduct;
