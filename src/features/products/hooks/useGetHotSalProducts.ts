"use client";

import { useQuery } from "@tanstack/react-query";
import getHotSalesProducts from "../apis/getHotSaleProducts";

export const useGetHotSalesProducts = ({ limit }: { limit: number }) => {
  return useQuery({
    queryKey: ["hot-sale-products", { limit }],
    queryFn: () => getHotSalesProducts({ limit }),
  });
};
