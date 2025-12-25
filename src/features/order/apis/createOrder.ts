import { supabase } from "@/src/lib/supabaseClient";
import { ShoppingCartItem } from "@/src/types/shoppingCart";
import { Product } from "@/src/types/product";
import axios from "axios";

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
): Promise<any> => {
  try {
    const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/orders", {
      items,
      name,
      address,
      country,
      email,
      phone,
      couponCode,
      discount,
      total,
      provinceId,
      districtId,
      wardCode,
    });

    return response.data.data ?? null;
    //   const { data: newShipment, error: newShipmentError } = await supabase
    //     .from("shipments")
    //     .insert({
    //       fullName: name,
    //       address,
    //       country,
    //       zipCode,
    //       email,
    //       phone,
    //       provinceId,
    //       districtId,
    //       wardCode,
    //     })
    //     .select("*")
    //     .single();
    //   if (newShipmentError) {
    //     console.error("Failed to create shipment:", newShipmentError);
    //     return null;
    //   }
    //   const { data: newOrder, error: newOrderError } = await supabase
    //     .from("orders")
    //     .insert({
    //       shipmentId: newShipment.id,
    //       userId: 2,
    //       discount: discount,
    //       totalAmount: total,
    //     })
    //     .select("*")
    //     .single();
    //   if (newOrderError) {
    //     console.error("Create order error:", newOrderError);
    //     return null;
    //   }
    //   const { data: orderItems, error: orderItemsError } = await supabase.from("orderItems").insert(
    //     items.map((item) => ({
    //       orderId: newOrder.id,
    //       productVariantId: item.productVariantId,
    //       quantity: item.quantity,
    //     }))
    //   ).select(`
    //   *,
    //   variants:productVariants(*)
    // `);
    //   if (orderItemsError) {
    //     console.error("Order items insert error:", orderItemsError);
    //     return null;
    //   }
    //   if (couponCode) {
    //     const { data: coupon, error: couponError } = await supabase
    //       .from("coupons")
    //       .select("*")
    //       .eq("code", couponCode)
    //       .single();
    //     if (couponError) {
    //       console.error("Coupon error:", couponError);
    //       return null;
    //     }
    //     if (coupon) {
    //       const { error: orderCouponError } = await supabase.from("orderCoupons").insert({
    //         orderId: newOrder.id,
    //         couponId: coupon.id,
    //         discountAmount: discount,
    //       });
    //       if (orderCouponError) {
    //         console.error("Order coupon error:", orderCouponError);
    //         return null;
    //       }
    //     }
    //   }
    //   const { data: payment, error: paymentError } = await supabase.from("payments").insert({
    //     orderId: newOrder.id,
    //     amount: total,
    //     method: "COD",
    //     status: "pending",
    //   });
    //   if (paymentError) {
    //     console.error("Payment insert error:", paymentError);
    //     return null;
    //   }
    //   return newOrder ?? null;
  } catch (err) {
    console.error("Unexpected error:", err);
    return null;
  }
};
