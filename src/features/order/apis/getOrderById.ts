import { supabase } from "@/src/lib/supabaseClient";
import { Order } from "@/src/types/order";

export const getOrderById = async (id: string): Promise<Order | null> => {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      shipment:shipmentId (*),
      orderItems (*, productVariant:productVariantId (*, product:productId (*))),
      orderCoupons (*),
      payment:payments(*)
    `
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch order:", error);
    return null;
  }

  return data ?? null;
};
