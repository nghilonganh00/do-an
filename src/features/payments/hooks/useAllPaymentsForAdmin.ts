"use client";

import { QueryOptions, useQuery } from "@tanstack/react-query";
import getAllPaymentsForAdmin from "../apis/getAllPaymentsForAdmin";
import { Params } from "@/src/types";

type UseGetAllPaymentsForAdminOptions = {
  params?: Params;
  queryConfig?: QueryOptions<Awaited<ReturnType<typeof getAllPaymentsForAdmin>>, Error>;
};

export const useGetAllPaymentsForAdmin = ({ params, queryConfig }: UseGetAllPaymentsForAdminOptions) => {
  return useQuery({
    queryKey: ["payments", { params }],
    queryFn: () => getAllPaymentsForAdmin({ params }),
    ...queryConfig,
  });
};
