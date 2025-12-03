import { useMutation } from "@tanstack/react-query";
import { Product } from "@/src/types/product";
import { createProduct } from "../apis/createProduct";
import { CreateProduct } from "../types";

const useCreateProduct = () => {
  return useMutation({
    mutationFn: async (data: CreateProduct) => createProduct(data),
  });
};

export default useCreateProduct;
