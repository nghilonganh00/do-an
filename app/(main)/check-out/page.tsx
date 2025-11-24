"use client";

import CheckBox from "@/src/components/common/input/Checkbox";
import { ArrowRight } from "@/src/components/icons/ArrowRight";
import { Check } from "@/src/components/icons/Check";
import { Stack } from "@/src/components/icons/Stack";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Coupon } from "@/src/types/coupon";
import { ShoppingCartItem } from "@/src/types/shoppingCart";
import { useGetMe } from "@/src/features/user/hooks/useGetMe";
import { useCreateOrder } from "@/src/features/order/hooks/useCreateOrder";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: user } = useGetMe();
  console.log("user", user);

  const [isPlacedOrder, setPlacedOrder] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const [billing, setBilling] = useState({
    name: "",
    companyName: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    email: "",
    phone: "",
  });

  const [order, setOrder] = useState<{
    items: ShoppingCartItem[];
    coupon: Coupon | null;
    subTotal: number;
    discount: number;
    shipping: number;
    total: number;
  } | null>(null);

  const { data: createOrderData, mutateAsync: createOrder } = useCreateOrder();

  const handlePlaceOrder = async () => {
    if (isSubmitting || !order) return;
    setSubmitting(true);
    try {
      await createOrder({
        items: order.items,
        name: billing.name,
        companyName: billing.companyName,
        address: billing.address,
        country: billing.country,
        state: billing.state,
        city: billing.city,
        zipCode: billing.zipCode,
        email: billing.email,
        phone: billing.phone,
        couponCode: order.coupon?.code ?? "",
        discount: order.discount,
        total: order.total,
      });
      setPlacedOrder(true);
    } catch (error) {
      console.error("Failed to place order:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Lấy order từ localStorage khi mount
  useEffect(() => {
    const storedOrder = localStorage.getItem("order");
    if (storedOrder) setOrder(JSON.parse(storedOrder));
  }, []);

  useEffect(() => {
    if (user) {
      setBilling((prev) => ({
        ...prev,
        name: user.name || "",
        address: user.address || "",
        email: user.email || "",
        phone: user.phone || "",
        companyName: user.companyName || "",
        country: user.country || "",
        state: user.state || "",
        city: user.city || "",
        zipCode: user.zipCode || "",
      }));
    }
  }, [user]);

  if (!order) {
    return <div className="text-center mt-40">No order found. Please add items to cart first.</div>;
  }

  return (
    <>
      {!isPlacedOrder ? (
        <div className="max-w-[1320px] mx-auto py-[72px] grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <h3 className="text-body-large-500">Billing Information</h3>
            <div className="grid grid-cols-12 gap-4 mt-6">
              <div className="col-span-6 flex flex-col justify-end">
                <label>User name</label>
                <input
                  value={billing.name}
                  onChange={(e) => setBilling({ ...billing, name: e.target.value })}
                  placeholder="Full name"
                  className="px-4 py-3 border border-gray-100 mt-1.5"
                />
              </div>
              <div className="col-span-6 flex flex-col justify-end">
                <label>Company Name</label>
                <input
                  value={billing.companyName}
                  onChange={(e) => setBilling({ ...billing, companyName: e.target.value })}
                  className="px-4 py-3 border border-gray-100 mt-1.5"
                />
              </div>
              <div className="col-span-12 flex flex-col justify-end">
                <label>Address</label>
                <input
                  value={billing.address}
                  onChange={(e) => setBilling({ ...billing, address: e.target.value })}
                  className="px-4 py-3 border border-gray-100 mt-1.5"
                />
              </div>
              <div className="col-span-3 flex flex-col justify-end">
                <label>Country</label>
                <input
                  value={billing.country}
                  onChange={(e) => setBilling({ ...billing, country: e.target.value })}
                  placeholder="Country"
                  className="px-4 py-3 border border-gray-100 mt-1.5"
                />
              </div>
              <div className="col-span-3 flex flex-col justify-end">
                <label>Region/State</label>
                <input
                  value={billing.state}
                  onChange={(e) => setBilling({ ...billing, state: e.target.value })}
                  placeholder="Region/State"
                  className="px-4 py-3 border border-gray-100 mt-1.5"
                />
              </div>
              <div className="col-span-3 flex flex-col justify-end">
                <label>City</label>
                <input
                  value={billing.city}
                  onChange={(e) => setBilling({ ...billing, city: e.target.value })}
                  placeholder="City"
                  className="px-4 py-3 border border-gray-100 mt-1.5"
                />
              </div>
              <div className="col-span-3 flex flex-col justify-end">
                <label>Zip Code</label>
                <input
                  value={billing.zipCode}
                  onChange={(e) => setBilling({ ...billing, zipCode: e.target.value })}
                  placeholder="Zip Code"
                  className="px-4 py-3 border border-gray-100 mt-1.5"
                />
              </div>
              <div className="col-span-6 flex flex-col justify-end">
                <label>Email</label>
                <input
                  value={billing.email}
                  onChange={(e) => setBilling({ ...billing, email: e.target.value })}
                  className="px-4 py-3 border border-gray-100 mt-1.5"
                />
              </div>
              <div className="col-span-6 flex flex-col justify-end">
                <label>Phone number</label>
                <input
                  value={billing.phone}
                  onChange={(e) => setBilling({ ...billing, phone: e.target.value })}
                  placeholder="Phone number"
                  className="px-4 py-3 border border-gray-100 mt-1.5"
                />
              </div>
            </div>

            <CheckBox title="Ship into different address" style={{ marginTop: 24, marginBottom: 40 }} />
          </div>

          <div className="col-span-4 px-6 py-5 rounded-sm border border-gray-100">
            <h3 className="text-body-large-500">Order Summary</h3>
            <div className="mt-5 space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-6">
                  <img
                    src={item.product?.image || "/assets/images/smart-tv.png"}
                    alt={item.product?.name}
                    width={64}
                    height={64}
                  />
                  <div>
                    <h4 className="text-body-small-400">{item.product?.name}</h4>
                    <div className="mt-2">
                      <span className="text-body-small-400 text-gray-600">{item.quantity} x</span>
                      <span className="text-body-small-600 text-secondary-500 ml-1">${item.product?.price || 0}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-body-small-400 text-gray-600">Sub-total</span>
                <span className="text-body-small-500">${order.subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-body-small-400 text-gray-600">Shipping</span>
                <span className="text-body-small-500">${order.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-body-small-400 text-gray-600">Discount</span>
                <span className="text-body-small-500">-${order.discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-body-small-400 text-gray-600">Tax</span>
                <span className="text-body-small-500">
                  ${(order.total - order.subTotal + order.discount - order.shipping).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-body-medium-400 text-gray-900">Total</span>
                <span className="text-body-small-600">${order.total.toFixed(2)} USD</span>
              </div>

              <button
                className="w-full h-14 flex items-center justify-center gap-2 mt-6 bg-primary-500 rounded-xs"
                onClick={handlePlaceOrder}
              >
                <span className="text-heading-7 text-gray uppercase">Place order</span>
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-[1320px] mx-auto h-full">
          <div className="max-w-[424px] mt-40 mx-auto flex flex-col items-center">
            <div className="w-[66px] h-[66px] flex items-center justify-center border-4 border-success-500 rounded-full">
              <Check size={30} color="#2DB224" />
            </div>

            <span className="text-heading-3 leading-0">Your order has been successfully placed</span>
            <span className="text-body-small-400 text-[#5F6C72] text-center mt-2">
              Pellentesque sed lectus nec tortor tristique accumsan quis dictum risus. Donec volutpat mollis nulla non
              facilisis.
            </span>

            <div className="w-full flex items-center justify-between gap-3">
              <button
                className="w-full h-12 flex-1 flex items-center justify-center gap-2 mt-6 border-2 border-primary-100 rounded-xs"
                onClick={() => router.push("/")}
              >
                <Stack color="#FA8232" />
                <span className="text-heading-7 text-primary-500">Go to Dashboard</span>
              </button>

              <button
                className="w-full h-12 flex-1 flex items-center justify-center gap-2 mt-6 bg-primary-500 rounded-xs"
                onClick={() => router.push(`/dashboard/orders/${createOrderData?.id}`)}
              >
                <span className="text-heading-7 text-gray">View Order</span>
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
