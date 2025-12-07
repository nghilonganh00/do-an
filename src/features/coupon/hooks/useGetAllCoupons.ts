"use client";

import { QueryOptions, useQuery } from "@tanstack/react-query";
import { getAllCoupons } from "../apis/getAllCoupons";

type UseGetAllCounponsOptions = {
  queryConfig?: QueryOptions<Awaited<ReturnType<typeof getAllCoupons>>, Error>;
};

export const useGetAllCoupons = (options?: UseGetAllCounponsOptions) => {
  return useQuery({
    queryKey: ["coupons"] as const,
    queryFn: () => {
      return getAllCoupons();
    },
    ...options?.queryConfig,
  });
};
