"use client";

import { QueryOptions, useQuery } from "@tanstack/react-query";
import { getMyOrderHistory } from "../apis/getMyOrderHistory";
import { Params } from "@/src/types";

type UseGetMyOrderHistoryOptions = {
  params?: Params;
  queryConfig?: QueryOptions<Awaited<ReturnType<typeof getMyOrderHistory>>, Error>;
};

export const useGetMyOrderHistory = (options?: UseGetMyOrderHistoryOptions) => {
  const params = options?.params;

  return useQuery({
    queryKey: ["order", { userId: 1 }] as const,
    queryFn: () => {
      return getMyOrderHistory({ params });
    },
    ...options?.queryConfig,
  });
};
