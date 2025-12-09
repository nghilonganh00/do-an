"use client";

import { QueryOptions, useQuery } from "@tanstack/react-query";
import getAllBestSellingProductVariant, { GetBestSellingProductParams } from "../apis/getAllBestSellingProductVariant";

type UseGetAllBestSellingProductVariantOptions = {
  params?: GetBestSellingProductParams;
  queryConfig?: QueryOptions<Awaited<ReturnType<typeof getAllBestSellingProductVariant>>, Error>;
};

export const UseGetAllBestSellingProductVariantOptions = ({
  params,
  queryConfig,
}: UseGetAllBestSellingProductVariantOptions) => {
  return useQuery({
    queryKey: ["best-selling-product", { params }],
    queryFn: () => getAllBestSellingProductVariant({ params }),
    ...queryConfig,
  });
};
