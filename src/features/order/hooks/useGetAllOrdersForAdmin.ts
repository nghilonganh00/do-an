"use client";

import { QueryOptions, useQuery } from "@tanstack/react-query";
import getAllOrdersForAdmin, { GetAllOrdersForAdminParams } from "../apis/getAllOrdersForAdmin";

type UseGetAllOrdersForAdminOptions = {
  params?: GetAllOrdersForAdminParams;
  queryConfig?: QueryOptions<Awaited<ReturnType<typeof getAllOrdersForAdmin>>, Error>;
};

export const useGetAllOrdersForAdmin = ({ params, queryConfig }: UseGetAllOrdersForAdminOptions) => {
  return useQuery({
    queryKey: ["orders-for-admin", { params }],
    queryFn: () => getAllOrdersForAdmin({ params }),
    ...queryConfig,
  });
};
