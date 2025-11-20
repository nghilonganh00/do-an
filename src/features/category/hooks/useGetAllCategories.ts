"use client";

import { QueryOptions, useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../api/getAllCategories";

type useGetAllCategoriesOptions = {
  queryConfig?: QueryOptions<Awaited<ReturnType<typeof getAllCategories>>, Error>;
};

export const useGetAllCategories = ({ queryConfig }: useGetAllCategoriesOptions = {}) => {
  return useQuery({
    queryKey: ["category"] as const,
    queryFn: () => getAllCategories(),
    ...queryConfig,
  });
};
