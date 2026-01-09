"use client";

import { useQuery } from "@tanstack/react-query";
import getBestRatingProducts from "../apis/getBestRatingProduct";

export const useGetBestRatingProducts = ({ limit }: { limit: number }) => {
  return useQuery({
    queryKey: ["best-rating-products", { limit }],
    queryFn: () => getBestRatingProducts({ limit }),
  });
};
