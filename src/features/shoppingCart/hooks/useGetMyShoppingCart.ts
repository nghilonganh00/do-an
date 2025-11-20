"use client";

import { QueryOptions, useQuery } from "@tanstack/react-query";
import { getMyShoppingCart } from "../apis/getMyShoppingCart";

type useGetMyShoppingCartOptions = {
  queryConfig?: QueryOptions<Awaited<ReturnType<typeof getMyShoppingCart>>, Error>;
};

export const useGetMyShoppingCart = ({ queryConfig }: useGetMyShoppingCartOptions = {}) => {
  return useQuery({
    queryKey: ["shopping-cart"] as const,
    queryFn: () => getMyShoppingCart(),
    ...queryConfig,
  });
};
