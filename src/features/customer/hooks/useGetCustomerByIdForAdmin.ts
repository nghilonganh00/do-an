"use client";

import { QueryOptions, useQuery } from "@tanstack/react-query";
import { getCustomerByIdForAdmin } from "../apis/getCustomerByIdForAdmin";

type UserGetCustomersByIdForAdminOptions = {
  queryConfig?: QueryOptions<Awaited<ReturnType<typeof getCustomerByIdForAdmin>>, Error>;
};

export const useGetCustomerByIdForAdmin = (id: number | null, options?: UserGetCustomersByIdForAdminOptions) => {
  return useQuery({
    queryKey: ["customers-for-admin", { id }] as const,
    queryFn: () => {
      if (!id) throw new Error("Product ID is required");
      return getCustomerByIdForAdmin(id);
    },
    enabled: !!id,
    ...options?.queryConfig,
  });
};
