"use client";

import { QueryOptions, useQuery } from "@tanstack/react-query";
import { getProducts } from "../apis/getProducts";
import { getProductById } from "../apis/getProductById";

type UseProductByIdOptions = {
  queryConfig?: QueryOptions<Awaited<ReturnType<typeof getProductById>>, Error>;
};

export const useGetProductById = (id: string | null, options?: UseProductByIdOptions) => {
  return useQuery({
    queryKey: ["product", { id }] as const,
    queryFn: () => {
      if (!id) throw new Error("Product ID is required");
      return getProductById(id);
    },
    enabled: !!id,
    ...options?.queryConfig,
  });
};
