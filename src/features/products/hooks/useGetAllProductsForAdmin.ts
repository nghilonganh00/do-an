"use client";

import { Params } from "@/src/types";
import { useQuery } from "@tanstack/react-query";
import { getAllProductsForAdmin } from "../apis/getAllProductsForAdmin";

export const useGetAllProductsForAdmin = (params: Params) => {
  return useQuery({
    queryKey: ["products-for-admin", params],
    queryFn: () => getAllProductsForAdmin(params),
    enabled: !!params,
  });
};
