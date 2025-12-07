"use client";

import { QueryOptions, useQuery } from "@tanstack/react-query";
import { getAllProvinces } from "../apis/getAllProvinces";

type useGetAllProvincesOptions = {
  queryConfig?: QueryOptions<Awaited<ReturnType<typeof getAllProvinces>>, Error>;
};

export const useGetAllProvinces = ({ queryConfig }: useGetAllProvincesOptions = {}) => {
  return useQuery({
    queryKey: ["provinces"] as const,
    queryFn: () => getAllProvinces(),
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    ...queryConfig,
  });
};
