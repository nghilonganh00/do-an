"use client";

import { QueryOptions, useQuery } from "@tanstack/react-query";
import { getMe } from "../apis/getMe";

type useGetMeOptions = {
  queryConfig?: QueryOptions<Awaited<ReturnType<typeof getMe>>, Error>;
};

export const useGetMe = ({ queryConfig }: useGetMeOptions = {}) => {
  return useQuery({
    queryKey: ["me"] as const,
    queryFn: () => getMe(),
    ...queryConfig,
  });
};
