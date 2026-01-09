"use client";

import { QueryOptions, useQuery } from "@tanstack/react-query";
import getAllPaymentsForAdmin, { PaymentParams } from "../apis/getAllPaymentsForAdmin";

type UseGetAllPaymentsForAdminOptions = {
  params?: PaymentParams;
  queryConfig?: QueryOptions<Awaited<ReturnType<typeof getAllPaymentsForAdmin>>, Error>;
};

export const useGetAllPaymentsForAdmin = ({ params, queryConfig }: UseGetAllPaymentsForAdminOptions) => {
  return useQuery({
    queryKey: ["payments", { params }],
    queryFn: () => getAllPaymentsForAdmin({ params }),
    ...queryConfig,
  });
};
