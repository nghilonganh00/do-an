"use client";

import { Params } from "@/src/types";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../apis/getAllProducts";

export const useGetAllProducts = (params: Params) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getAllProducts(params),
    enabled: !!params,
  });
};
