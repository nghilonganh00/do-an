"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductsForBrower, GetProductsForBrowerParams } from "../apis/getAllProuctsForBrower";

export const useGetAllProductsForBrower = (params: GetProductsForBrowerParams) => {
  return useQuery({
    queryKey: ["products-for-brower", params],
    queryFn: () => getProductsForBrower(params),
    enabled: !!params,
  });
};
