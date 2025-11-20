"use client";

import { QueryOptions, useQuery } from "@tanstack/react-query";
import { getProducts } from "../apis/getProducts";

type useGetProductsOptions = {
  params?: { categoryId: string };
  queryConfig?: QueryOptions<Awaited<ReturnType<typeof getProducts>>, Error>;
};

export const useGetProducts = ({ params, queryConfig }: useGetProductsOptions = {}) => {
  return useQuery({
    queryKey: ["product", { params }] as const,
    queryFn: () => getProducts({ categoryId: params?.categoryId }),
    ...queryConfig,
  });
};
