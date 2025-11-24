"use client";

import { Heart, Search, ShoppingCart, User } from "../icons";
import { X } from "../icons/X";
import { ArrowRight } from "../icons/ArrowRight";
import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useGetMyShoppingCart } from "@/src/features/shoppingCart/hooks/useGetMyShoppingCart";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [isShopCartVisible, setShopCartVisible] = useState(false);
  const { data: shoppingCartItems } = useGetMyShoppingCart();
  const totalPrice = useMemo(() => {
    return shoppingCartItems?.reduce((total, item) => {
      return total + (item?.product?.price || 0) * (item?.quantity || 0);
    }, 0);
  }, [shoppingCartItems]);

  const handleToggleShopCart = useCallback(() => {
    setShopCartVisible((prev) => !prev);
  }, []);

  const handleNavigateToCart = useCallback(() => {
    router.push("/shopping-cart");
    handleToggleShopCart();
  }, []);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="w-full bg-secondary-700">
      <div className="max-w-[1320px] mx-auto flex items-center justify-between py-5 gap-4">
        <div className="text-white font-bold text-lg">Icon</div>

        <div className="flex-1 max-w-[646px] flex items-center bg-white rounded-md overflow-hidden shadow-sm">
          <input
            type="text"
            placeholder="Search for anything..."
            className="flex-1 px-4 py-2 outline-none text-gray-700 placeholder-gray-400"
          />
          <Search className="w-5 h-5 text-gray-500 mr-3" />
        </div>

        <div className="flex items-center gap-4 text-white">
          <div className="relative">
            <button onClick={handleToggleShopCart}>
              <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-gray-200" />
            </button>

            {isShopCartVisible && (
              <div className="absolute right-0 w-[376px] bg-white border border-gray-100 rounded-sm z-50 shadow">
                <div className="px-6 py-4 border-b border-gray-100">
                  <span className="text-body-medium-500 text-gray-900">Shopping Cart </span>
                  <span className="text-body-medium-400 text-gray-600">(02)</span>
                </div>

                <div className="px-6 py-5 space-y-4 border-b border-gray-100">
                  {shoppingCartItems?.map((item) => (
                    <div className="flex items-center justify-between gap-4">
                      <div className="border border-gray-100 ">
                        <img src={item?.product?.image || ""} alt={item?.product?.name || ""} width={80} height={80} />
                      </div>

                      <div>
                        <span className="text-body-small-400 text-gray-900">
                          Canon EOS 1500D DSLR Camera Body+ 18-55 mm
                        </span>
                        <div className="mt-2">
                          <span className="text-body-small-400 text-gray-600">{item?.quantity || 0} x</span>
                          <span className="text-body-small-600 text-secondary-500 ml-1">
                            ${item?.product?.price || 0}
                          </span>
                        </div>
                      </div>

                      <X size={16} />
                    </div>
                  ))}
                </div>

                <div className="px-6 py-5 ">
                  <div className="flex items-center justify-between">
                    <span className="text-body-small-400 text-gray-600">Sub-Total:</span>
                    <span className="text-body-small-500 text-gray-900">${totalPrice} USD</span>
                  </div>

                  <button className="w-full h-12 flex items-center justify-center gap-2 mt-6 bg-primary-500 rounded-xs">
                    <span className="text-heading-7 text-gray">CHECKOUT NOW</span>
                    <ArrowRight />
                  </button>

                  <button
                    onClick={handleNavigateToCart}
                    className="w-full h-12 flex items-center justify-center gap-2 mt-6 border-2 border-primary-100 rounded-xs"
                  >
                    <span className="text-heading-7 text-primary-500 uppercase">View Cart</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          <button>
            <Heart width={32} height={32} className="w-6 h-6 cursor-pointer hover:text-gray-200" />
          </button>
          <button onClick={() => router.push("/dashboard")}>
            <User className="w-6 h-6 cursor-pointer hover:text-gray-200" />
          </button>
        </div>
      </div>
    </div>
  );
}
