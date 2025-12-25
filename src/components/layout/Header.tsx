"use client";

import { Heart, Search, ShoppingCart, User } from "../icons";
import { X } from "../icons/X";
import { ArrowRight } from "../icons/ArrowRight";
import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useGetMyShoppingCart } from "@/src/features/shoppingCart/hooks/useGetMyShoppingCart";
import Image from "next/image";
import { formatPriceVN } from "@/src/utils/formatPriceVN";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [isShopCartVisible, setShopCartVisible] = useState(false);
  const { data: shoppingCartItems } = useGetMyShoppingCart();

  const totalPrice = useMemo(() => {
    return shoppingCartItems?.reduce((total, item) => {
      return total + (item?.variant?.price || 0) * (item?.quantity || 0);
    }, 0);
  }, [shoppingCartItems]);

  const handleToggleShopCart = useCallback(() => {
    setShopCartVisible((prev) => !prev);
  }, []);

  const handleNavigateToCart = useCallback(() => {
    router.push("/shopping-cart");
    handleToggleShopCart();
  }, [handleToggleShopCart, router]);

  // Ẩn header ở trang admin
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="w-full bg-secondary-700">
      <div className="max-w-[1320px] mx-auto flex items-center justify-between py-5 gap-4">
        {/* Logo */}
        <div className="text-white font-bold text-lg"></div>

        {/* Ô tìm kiếm */}
        <div className="flex-1 max-w-[646px] flex items-center bg-white rounded-md overflow-hidden shadow-sm">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="flex-1 px-4 py-2 outline-none text-gray-700 placeholder-gray-400"
          />
          <Search className="w-5 h-5 text-gray-500 mr-3" />
        </div>

        {/* Icon actions */}
        <div className="flex items-center gap-4 text-white">
          {/* Giỏ hàng */}
          <div className="relative">
            <button onClick={handleToggleShopCart}>
              <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-gray-200" />
            </button>

            {isShopCartVisible && (
              <div className="absolute right-0 w-[376px] bg-white border border-gray-100 rounded-sm z-50 shadow">
                {/* Header giỏ hàng */}
                <div className="px-6 py-4 border-b border-gray-100">
                  <span className="text-body-medium-500 text-gray-900">Giỏ hàng</span>
                  <span className="text-body-medium-400 text-gray-600 ml-1">({shoppingCartItems?.length || 0})</span>
                </div>

                {/* Danh sách sản phẩm */}
                <div className="px-6 py-5 space-y-4 border-b border-gray-100">
                  {shoppingCartItems?.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-4">
                      <div className="border border-gray-100">
                        <Image
                          src={item?.variant?.thumbnail || ""}
                          alt={item?.variant?.product?.name || ""}
                          width={80}
                          height={80}
                        />
                      </div>

                      <div className="flex-1">
                        <span className="text-body-small-400 text-gray-900">{item?.variant?.product?.name || ""}</span>
                        <div className="mt-2">
                          <span className="text-body-small-400 text-gray-600">{item?.quantity || 0} x</span>
                          <span className="text-body-small-600 text-secondary-500 ml-1">
                            {formatPriceVN(item?.variant?.price || 0)}
                          </span>
                        </div>
                      </div>

                      <X size={16} className="cursor-pointer" />
                    </div>
                  ))}
                </div>

                {/* Tổng tiền & action */}
                <div className="px-6 py-5">
                  <div className="flex items-center justify-between">
                    <span className="text-body-small-400 text-gray-600">Tạm tính:</span>
                    <span className="text-body-small-500 text-gray-900">{formatPriceVN(totalPrice || 0)}</span>
                  </div>

                  <button
                    className="w-full h-12 flex items-center justify-center gap-2 mt-6 bg-primary-500 rounded-xs"
                    onClick={() => {
                      handleToggleShopCart();
                      router.push("/check-out");
                    }}
                  >
                    <span className="text-heading-7 text-gray">THANH TOÁN NGAY</span>
                    <ArrowRight />
                  </button>

                  <button
                    onClick={handleNavigateToCart}
                    className="w-full h-12 flex items-center justify-center gap-2 mt-6 border-2 border-primary-100 rounded-xs"
                  >
                    <span className="text-heading-7 text-primary-500 uppercase">Xem giỏ hàng</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Yêu thích */}
          <button>
            <Heart className="w-6 h-6 cursor-pointer hover:text-gray-200" />
          </button>

          {/* Tài khoản */}
          <button onClick={() => router.push("/dashboard")}>
            <User className="w-6 h-6 cursor-pointer hover:text-gray-200" />
          </button>
        </div>
      </div>
    </div>
  );
}
