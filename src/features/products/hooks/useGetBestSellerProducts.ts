"use client";

import { useQuery } from "@tanstack/react-query";
import getBestSellerProduct from "../apis/getBestSellerProduct";

export const useGetBestSellerProducts = ({ limit }: { limit: number }) => {
  return useQuery({
    queryKey: ["best-seller-products", { limit }],
    queryFn: () => getBestSellerProduct({ limit }),
  });
};
