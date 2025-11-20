"use client";

import { QueryOptions, useQuery } from "@tanstack/react-query";
import { Category } from "@/src/types/product";
import { getCategoryById } from "../api/getCategoryById";

type useGetCategoryByIdOptions = {
  params?: { categoryId: string };
  queryConfig?: QueryOptions<Awaited<ReturnType<typeof getCategoryById>>, Error>;
};

export const useGetCategoryById = ({ params, queryConfig }: useGetCategoryByIdOptions = {}) => {
  return useQuery<Category, Error>({
    queryKey: ["categories", params],
    queryFn: () => getCategoryById(params?.categoryId || ""),
    ...queryConfig,
  });
};
