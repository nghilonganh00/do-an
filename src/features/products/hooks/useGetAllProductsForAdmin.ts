"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllProductsForAdmin, GetProductsForAdminParams } from "../apis/getAllProductsForAdmin";

export const useGetAllProductsForAdmin = (params: GetProductsForAdminParams) => {
  console.log("params: ", params);
  return useQuery({
    queryKey: ["products-for-admin", params],
    queryFn: () => getAllProductsForAdmin(params),
    enabled: !!params,
  });
};
