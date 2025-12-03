"use client";

import { Params } from "@/src/types";
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../apis/getAllOrders";

export const useGetAllOrders = (params: Params) => {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => getAllOrders(params),
    enabled: !!params, // tránh chạy khi params = undefined
  });
};
