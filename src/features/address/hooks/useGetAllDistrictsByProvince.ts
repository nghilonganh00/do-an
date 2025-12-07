"use client";

import { QueryOptions, useQuery } from "@tanstack/react-query";
import { getAllDistrictsByProvince } from "../apis/getAllDistrictsByProvince";

type useGetAllProvincesOptions = {
  queryConfig?: QueryOptions<Awaited<ReturnType<typeof getAllDistrictsByProvince>>, Error>;
};

export const useGetAllDistrictsByProvince = (
  provinceId: number | null,
  { queryConfig }: useGetAllProvincesOptions = {}
) => {
  return useQuery({
    queryKey: ["districts", { provinceId }] as const,
    queryFn: () => getAllDistrictsByProvince(Number(provinceId)),
    enabled: !!provinceId,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    ...queryConfig,
  });
};
