"use client";

import { QueryOptions, useQuery } from "@tanstack/react-query";
import { getOrderById } from "../apis/getOrderById";

type UseGetOrderByIdOptions = {
  queryConfig?: QueryOptions<Awaited<ReturnType<typeof getOrderById>>, Error>;
};

export const useGetOrderById = (id: string | null, options?: UseGetOrderByIdOptions) => {
  return useQuery({
    queryKey: ["order", { id }] as const,
    queryFn: () => {
      if (!id) throw new Error("Product ID is required");
      return getOrderById(id);
    },
    enabled: !!id,
    ...options?.queryConfig,
  });
};
