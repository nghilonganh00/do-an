"use client";

import { QueryOptions, useQuery } from "@tanstack/react-query";
import { getAllCustomers } from "../apis/getAllCustomers";
import { Params } from "@/src/types";

type UseGetAllCustomers = {
  queryConfig?: QueryOptions<Awaited<ReturnType<typeof getAllCustomers>>, Error>;
};

export const useGetAllCustomers = (params: Params, options?: UseGetAllCustomers) => {
  return useQuery({
    queryKey: ["customers", params] as const,
    queryFn: () => {
      return getAllCustomers(params);
    },
    ...options?.queryConfig,
  });
};
