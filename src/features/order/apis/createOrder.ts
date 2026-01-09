import { ShoppingCartItem } from "@/src/types/shoppingCart";
import axios from "axios";
import { Order } from "@/src/types/order";

export const createOrder = async (
  items: ShoppingCartItem[],
  name: string,
  address: string,
  country: string,
  email: string,
  phone: string,
  couponCode: string,
  discount: number,
  total: number,
  provinceId: number,
  districtId: number,
  wardCode: number
): Promise<Order | null> => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/orders",
      {
        items,
        name,
        address,
        email,
        phone,
        couponCode,
        total,
        provinceId,
        districtId,
        wardCode,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.data ?? null;
  } catch (err) {
    console.error("Unexpected error:", err);
    throw new Error(err.message);
  }
};
