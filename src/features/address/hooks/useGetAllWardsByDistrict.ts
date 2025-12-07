"use client";

import { QueryOptions, useQuery } from "@tanstack/react-query";
import { getAllWardsByDistrict } from "../apis/getAllWardsByDistrict";

type useGetAllWardsByDistrictOptions = {
  queryConfig?: QueryOptions<Awaited<ReturnType<typeof getAllWardsByDistrict>>, Error>;
};

export const useGetAllWardsByDistrict = (
  districtId: number | null,
  { queryConfig }: useGetAllWardsByDistrictOptions = {}
) => {
  return useQuery({
    queryKey: ["wards", { districtId }] as const,
    queryFn: () => getAllWardsByDistrict(Number(districtId)),
    enabled: !!districtId,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    ...queryConfig,
  });
};
