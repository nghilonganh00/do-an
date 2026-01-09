"use client";

import { useQuery } from "@tanstack/react-query";
import { getFeedbacksByProductId } from "../apis/getFeedbacksByProductId";

export const useGetFeedbacksByProductId = (productId: number) => {
  return useQuery({
    queryKey: ["feedbacks-by-product", productId],
    queryFn: () => getFeedbacksByProductId(productId),
  });
};
