import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShoppingCartItem } from "@/src/types/shoppingCart";
import { createOrder } from "../apis/createOrder";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      items: ShoppingCartItem[];
      name: string;
      companyName: string;
      address: string;
      country: string;
      state: string;
      city: string;
      zipCode: string;
      email: string;
      phone: string;
      couponCode: string;
      discount: number;
      total: number;
      provinceId: number;
      districtId: number;
      wardCode: string;
    }) => {
      return await createOrder(
        payload.items,
        payload.name,
        payload.address,
        payload.country,
        payload.email,
        payload.phone,
        payload.couponCode,
        payload.discount,
        payload.total,
        payload.provinceId,
        payload.districtId,
        payload.wardCode
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },

    onError: (error) => {
      console.error("Create order failed:", error);
    },
  });
};
