"use client";

import { QueryOptions, useQuery } from "@tanstack/react-query";
import { getCategoriesWithTotal } from "../api/getCategoriesWithTotal";
import { Category } from "@/src/types/product";

type useGetCategoriesWithTotalOptions = {
  queryConfig?: QueryOptions<Awaited<ReturnType<typeof getCategoriesWithTotal>>, Error>;
};

export const useGetCategoriesWithTotal = ({ queryConfig }: useGetCategoriesWithTotalOptions = {}) => {
  return useQuery<Category[], Error>({
    queryKey: ["categories-with-total"],
    queryFn: getCategoriesWithTotal,
    ...queryConfig,
  });
};
