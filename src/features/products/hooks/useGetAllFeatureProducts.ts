"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllFeatureProducts } from "../apis/getAllFeatureProducts";

export const useGetAllFeatureProducts = () => {
  return useQuery({
    queryKey: ["feature-products"],
    queryFn: () => getAllFeatureProducts(),
  });
};
