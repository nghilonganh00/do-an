import { useQuery, QueryOptions } from "@tanstack/react-query";
import { Product } from "@/src/types/product";
import { getProductsByCategory } from "../apis/getProductsByCategory";

type UseProductsByCategoryOptions = {
  params: { categoryId: string };
  queryConfig?: QueryOptions<Product[], Error>;
};

export const useProductsByCategory = ({ params, queryConfig }: UseProductsByCategoryOptions) => {
  return useQuery<Product[], Error>({
    queryKey: ["products", params.categoryId],
    queryFn: () => getProductsByCategory(params.categoryId),
    enabled: !!params.categoryId,
    ...queryConfig,
  });
};
