"use client";

import { Params } from "@/src/types";
import { useQuery } from "@tanstack/react-query";
import { getMyOrders } from "../apis/getMyOrders";

export const useGetMyOrders = (params: Params) => {
  return useQuery({
    queryKey: ["my-orders", params],
    queryFn: () => getMyOrders(params),
    enabled: !!params, // tránh chạy khi params = undefined
  });
};
