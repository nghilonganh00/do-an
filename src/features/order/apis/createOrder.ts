import { supabase } from "@/src/lib/supabaseClient";
import { ShoppingCartItem } from "@/src/types/shoppingCart";
import { Product } from "@/src/types/product";

export const createOrder = async (
  items: ShoppingCartItem[],
  name: string,
  companyName: string,
  address: string,
  country: string,
  state: string,
  city: string,
  zipCode: string,
  email: string,
  phone: string,
  couponCode: string,
  discount: number,
  total: number
): Promise<(ShoppingCartItem & { product: Product }) | null> => {
  try {
    const { data: newShipment, error: newShipmentError } = await supabase
      .from("shipments")
      .insert({
        fullName: name,
        companyName,
        address,
        country,
        state,
        city,
        zipCode,
        email,
        phone,
      })
      .select("*")
      .single();

    if (newShipmentError) {
      console.error("Failed to create shipment:", newShipmentError);
      return null;
    }

    const { data: newOrder, error: newOrderError } = await supabase
      .from("orders")
      .insert({
        shipmentId: newShipment.id,
        userId: 2,
        discount: discount,
        totalAmount: total,
      })
      .select("*")
      .single();

    if (newOrderError) {
      console.error("Create order error:", newOrderError);
      return null;
    }

    const { data: orderItems, error: orderItemsError } = await supabase.from("orderItems").insert(
      items.map((item) => ({
        orderId: newOrder.id,
        productVariantId: item.productVariantId,
        quantity: item.quantity,
      }))
    ).select(`
    *,
    variants:productVariants(*)
  `);

    if (orderItemsError) {
      console.error("Order items insert error:", orderItemsError);
      return null;
    }

    if (couponCode) {
      const { data: coupon, error: couponError } = await supabase
        .from("coupons")
        .select("*")
        .eq("code", couponCode)
        .single();

      if (couponError) {
        console.error("Coupon error:", couponError);
        return null;
      }

      if (coupon) {
        const { error: orderCouponError } = await supabase.from("orderCoupons").insert({
          orderId: newOrder.id,
          couponId: coupon.id,
          discountAmount: discount,
        });

        if (orderCouponError) {
          console.error("Order coupon error:", orderCouponError);
          return null;
        }
      }
    }

    const { data: payment, error: paymentError } = await supabase.from("payments").insert({
      orderId: newOrder.id,
      amount: total,
      method: "COD",
      status: "pending",
    });

    if (paymentError) {
      console.error("Payment insert error:", paymentError);
      return null;
    }

    return newOrder ?? null;
  } catch (err) {
    console.error("Unexpected error:", err);
    return null;
  }
};
