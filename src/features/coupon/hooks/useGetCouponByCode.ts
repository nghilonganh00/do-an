"use client";

import { QueryOptions, useQuery } from "@tanstack/react-query";
import { getCouponByCode } from "../apis/getCouponByCode";

type UseGetCouponByCodeOptions = {
  queryConfig?: QueryOptions<Awaited<ReturnType<typeof getCouponByCode>>, Error>;
};

export const useGetCouponByCode = (code: string | null, options?: UseGetCouponByCodeOptions) => {
  return useQuery({
    queryKey: ["coupons", { code }] as const,
    queryFn: () => {
      if (!code) throw new Error("Product ID is required");
      return getCouponByCode(code);
    },
    enabled: !!code,
    ...options?.queryConfig,
  });
};
