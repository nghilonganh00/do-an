"use client";

import { QueryOptions, useQuery } from "@tanstack/react-query";
import { getMyOrderHistory } from "../apis/getMyOrderHistory";

type UseGetMyOrderHistoryOptions = {
  queryConfig?: QueryOptions<Awaited<ReturnType<typeof getMyOrderHistory>>, Error>;
};

export const useGetMyOrderHistory = (options?: UseGetMyOrderHistoryOptions) => {
  return useQuery({
    queryKey: ["order", { userId: 1 }] as const,
    queryFn: () => {
      return getMyOrderHistory();
    },
    ...options?.queryConfig,
  });
};
