"use client";

import { Line } from "@/src/components/common/Line";
import { ArrowRight } from "@/src/components/icons/ArrowRight";
import { X } from "@/src/components/icons/X";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useGetMyShoppingCart } from "@/src/features/shoppingCart/hooks/useGetMyShoppingCart";
import { useRemoveFromCart } from "@/src/features/shoppingCart/hooks/useRemoveFromCart";
import { useQueryClient } from "@tanstack/react-query";
import { useGetCouponByCode } from "@/src/features/coupon/hooks/useGetCouponByCode";
import { Coupon } from "@/src/types/coupon";
import { DISCOUNT_TYPE } from "@/src/constants";
import Stepper from "@/src/components/common/Stepper";
import { ShoppingCartItem } from "@/src/types/shoppingCart";
import Image from "next/image";
import { formatPriceVN } from "@/src/utils/formatPriceVN";

export default function ShoppingCart() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);

  const { data: shoppingCartItems } = useGetMyShoppingCart();
  const { mutate: removeFromCart } = useRemoveFromCart();
  const { refetch: fetchCoupon } = useGetCouponByCode(couponCode);

  const handleRemoveItem = useCallback(
    (productId: number) => {
      removeFromCart(productId);
    },
    [removeFromCart]
  );

  const onChangeQuantity = (itemId: number, newQuantity: number) => {
    queryClient.setQueryData(["shopping-cart"], (oldData: ShoppingCartItem[]) => {
      return oldData.map((item: ShoppingCartItem) => (item.id === itemId ? { ...item, quantity: newQuantity } : item));
    });
  };

  const handleApplyCoupon = useCallback(async () => {
    if (!couponCode) {
      setCouponMessage("Vui lòng nhập mã giảm giá");
      setCoupon(null);
      return;
    }

    const { data } = await fetchCoupon();
    if (!data || !data.id) {
      setCouponMessage("Mã giảm giá không hợp lệ hoặc đã hết hạn");
      setCoupon(null);
      return;
    }

    setCoupon(data);
    setCouponMessage(`Đã áp dụng mã giảm giá: ${data.description}`);
  }, [couponCode, fetchCoupon]);

  const subTotal =
    shoppingCartItems?.reduce((total, item) => total + (item.variant?.price || 0) * (item.quantity || 0), 0) || 0;

  const discount = coupon
    ? coupon.discountType === DISCOUNT_TYPE.PERCENT
      ? subTotal * (coupon.discountValue || 0)
      : coupon.discountValue || 0
    : 0;

  const shipping = 0;
  const tax = 61.99;
  const total = Math.round(subTotal - discount + shipping + tax);

  const handleProceedToCheckout = useCallback(() => {
    localStorage.setItem(
      "order",
      JSON.stringify({
        items: shoppingCartItems,
        coupon,
        subTotal,
        discount,
        shipping,
        tax,
        total,
      })
    );
    router.push("check-out");
  }, [shoppingCartItems, coupon, subTotal, discount, shipping, tax, total, router]);

  return (
    <div className="w-full">
      <div className="max-w-[1320px] grid grid-cols-12 mt-[72px]">
        <div className="col-span-8">
          <div className="px-6 py-5 w-full">
            <h4 className="text-body-large-500">Giỏ hàng</h4>

            <table className="w-full border border-gray-200 rounded-md overflow-hidden mt-5">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Sản phẩm</th>
                  <th className="px-4 py-2 text-right">Giá</th>
                  <th className="px-4 py-2 text-right">Số lượng</th>
                  <th className="px-4 py-2 text-right">Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {shoppingCartItems?.map((item) => (
                  <tr key={item.id} className="border-t border-gray-200">
                    <td className="px-4 py-2 flex items-center gap-3">
                      <button onClick={() => handleRemoveItem(item.id)}>
                        <X />
                      </button>
                      <Image
                        src={item.variant?.thumbnail || ""}
                        alt={item.variant?.product?.name || ""}
                        width={72}
                        height={72}
                      />
                      <span className="text-body-small-400">{item.variant?.product?.name || ""}</span>
                      <span className="text-body-small-400">({item.variant?.variantName})</span>
                    </td>
                    <td className="px-4 py-2 text-right">{formatPriceVN(item.variant?.price || 0)}</td>
                    <td className="px-4 py-2 text-right w-12">
                      <Stepper
                        value={item?.quantity || 1}
                        onChange={(quantity) => onChangeQuantity(item.id, quantity)}
                        className="w-[148px]"
                      />
                    </td>
                    <td className="px-4 py-2 text-right">
                      {formatPriceVN((item.variant?.price || 0) * (item.quantity || 0))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-4">
          <div className="px-6 py-5 rounded-sm border border-gray-100">
            <span className="text-body-large-500">Tổng quan giỏ hàng</span>

            <div className="flex justify-between items-center mt-5">
              <span className="text-body-small-400 text-gray-600">Tạm tính</span>
              <span className="text-body-small-500">{formatPriceVN(subTotal)}</span>
            </div>

            <div className="flex justify-between items-center mt-3">
              <span className="text-body-small-400 text-gray-600">Phí vận chuyển</span>
              <span className="text-body-small-500">{shipping === 0 ? "Miễn phí" : formatPriceVN(shipping)}</span>
            </div>

            <div className="flex justify-between items-center mt-3">
              <span className="text-body-small-400 text-gray-600">Giảm giá</span>
              <span className="text-body-small-500">-{formatPriceVN(discount)}</span>
            </div>

            <div className="flex justify-between items-center mt-8">
              <span className="text-body-medium-400 text-gray-600">Tổng cộng</span>
              <span className="text-body-small-600">{formatPriceVN(total)}</span>
            </div>

            <button
              className="w-full h-14 flex items-center justify-center gap-2 mt-6 bg-primary-500 rounded-xs"
              onClick={handleProceedToCheckout}
            >
              <span className="text-heading-7 text-gray">Tiến hành thanh toán</span>
              <ArrowRight />
            </button>
          </div>

          <div className="px-6 py-5 rounded-sm border border-gray-100 mt-4">
            <span className="text-body-large-500">Mã giảm giá</span>
            <Line my={3} />

            <input
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2"
              placeholder="Nhập mã giảm giá"
            />

            {couponMessage && <p className="text-sm mt-2">{couponMessage}</p>}

            <button
              onClick={handleApplyCoupon}
              className="w-56 h-14 flex items-center justify-center mt-6 bg-secondary-500 rounded-xs"
            >
              <span className="text-heading-7 text-gray">Áp dụng mã</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
