"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrderInfo } from "../apis/getOrderInfo";

export const useGetOrderInfo = (orderCode: string) => {
  return useQuery({
    queryKey: ["order-info", orderCode],
    queryFn: () => getOrderInfo(orderCode),
    enabled: !!orderCode,
    staleTime: 0,
  });
};
