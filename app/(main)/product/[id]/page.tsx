"use client";

import Dropdown from "@/src/components/common/input/Dropdown";
import Stepper from "@/src/components/common/Stepper";
import { ChevronUp, CreditCard, Heart, Star } from "@/src/components/icons";
import { Handshake } from "@/src/components/icons/Handshake";
import { Headphones } from "@/src/components/icons/Headphones";
import { Medal } from "@/src/components/icons/Medal";
import { ShoppingCartSimple } from "@/src/components/icons/ShoppingCartSimple";
import { Truck } from "@/src/components/icons/Truck";
import { useGetCouponByCode } from "@/src/features/coupon/hooks/useGetCouponByCode";
import { useGetProductById } from "@/src/features/products/hooks/useGetProductById";
import { useAddToCart } from "@/src/features/shoppingCart/hooks/useAddToCart";
import { ProductVariant } from "@/src/types/product";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

interface ShoppingCartItemState {
  productId: number;
  quantity: number;
  couponId: number | null;
  variant: ProductVariant | null;
}

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [shoppingCardItem, setShoppingCardItem] = useState<ShoppingCartItemState>({
    productId: Number(id),
    quantity: 1,
    couponId: null,
    variant: null,
  });
  const { data: product } = useGetProductById(id);
  const groupedOptions = useMemo(() => {
    const allOptionValues =
      product?.variants?.flatMap((variant) => variant.variantValues?.map((value) => value?.optionValue) ?? []) ?? [];

    return allOptionValues.reduce<Record<string, typeof allOptionValues>>((acc, optionValue) => {
      if (!optionValue?.option) return acc;

      const key = optionValue.option.name || "";

      if (!acc[key]) acc[key] = [];
      acc[key].push(optionValue);
      return acc;
    }, {});
  }, [product]);

  console.log("categories: ", groupedOptions);

  const { mutate: addToCart } = useAddToCart();

  const handleAddToCart = useCallback(() => {
    if (!shoppingCardItem) return;

    addToCart(shoppingCardItem, {
      onSuccess: () => {
        router.push("/shopping-card");
      },
    });
  }, [shoppingCardItem]);

  useEffect(() => {
    if (!product?.variants?.[0]) return;

    setShoppingCardItem({
      ...shoppingCardItem,
      productId: product?.id || 0,
      variant: product?.variants?.[0],
    });
  }, [product]);

  console.log("product: ", shoppingCardItem.variant?.sku);

  return (
    <div className="w-full">
      <div className="w-[80%] max-w-[1320px] mx-auto">
        <div className="flex gap-14 bg-white z-10 mt-8 rounded-sm">
          <div className="flex-1">
            <div>
              <Image src="/assets/images/laptop-main.png" alt="Laptop main image" width={616} height={464} priority />
            </div>
            <div className="flex">
              <Image src="/assets/images/laptop-01.png" alt="Laptop image 1" width={96} height={96} />
              <Image src="/assets/images/laptop-02.png" alt="Laptop image 1" width={96} height={96} />
              <Image src="/assets/images/laptop-03.png" alt="Laptop image 1" width={96} height={96} />
              <Image src="/assets/images/laptop-04.png" alt="Laptop image 1" width={96} height={96} />
              <Image src="/assets/images/laptop-05.png" alt="Laptop image 1" width={96} height={96} />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex gap-1.5 items-center">
              <div className="flex">
                {Array.from({ length: product?.stars || 0 }).map((_, index) => (
                  <Star key={index} />
                ))}
              </div>
              <span className="text-body-small-600">{product?.stars || 0} Star Rating</span>
              <span className="text-body-small-400 text-gray-600">(21,671 User feedback)</span>
            </div>
            <span className="text-body-xl-400 mt-2">{product?.name || ""}</span>
            <div className="mt-4">
              <div className="flex ">
                <div className="flex-1">
                  <span>Sku: {shoppingCardItem?.variant?.sku || ""}</span>
                </div>
                <div className="flex-1">
                  <span>
                    Availability: <span className="text-success-500">In stock</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex mt-6 items-center">
              <span className="text-heading-3 text-secondary-500">${product?.variants?.[0].price || 0}</span>
              <span className="text-lg text-gray-500 ml-1 line-through">
                ${product?.variants?.[0].originalPrice || 0}
              </span>
              <div className="ml-3 bg-warning-400 px-[10] py-[5]">
                <span className="text-body-small-600">
                  {Math.round(
                    (((product?.variants?.[0].originalPrice || 0) - (product?.variants?.[0].price || 0)) /
                      (product?.variants?.[0].originalPrice || 1)) *
                      100
                  )}
                  % OFF
                </span>
              </div>
            </div>

            <div className="grid grid-cols-12 mt-3 gap-6">
              {Object.entries(groupedOptions).map(([categoryName, optionValues], index) => {
                const options = optionValues.map((v) => ({
                  key: v?.id || 0,
                  value: v?.value || "",
                }));

                return (
                  <div key={index} className="col-span-6">
                    <div className="text-body-small-400">{categoryName}</div>
                    <Dropdown key={index} value={optionValues?.[0]?.value || ""} />
                  </div>
                );
              })}

              <Stepper
                value={shoppingCardItem.quantity}
                onChange={(quantity) =>
                  setShoppingCardItem((prev) => ({
                    ...prev,
                    quantity,
                  }))
                }
                className="col-span-3"
              />

              <button
                className="col-span-6 flex justify-center items-center bg-primary-500  h-full gap-3"
                onClick={handleAddToCart}
              >
                <span className="text-heading-3 text-gray">ADD TO CARD</span>
                <ShoppingCartSimple />
              </button>

              <div className="col-span-3 h-full flex justify-center items-center border-2 border-primary-500 rounded-[3px]">
                <span className="text-heading-6 text-primary-500">Buy now</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-1.5">
                <Heart width={24} height={24} color="#475156" />
                <span>Add to Wishlist</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 border border-gray-100 rounded-sm p-10 mt-[72px]">
          <div className="col-span-9">
            <div>
              <span className="text-body-medium-600">Description</span>
            </div>
            <p className="text-body-small-400 text-gray-600 mt-3">
              The most powerful MacBook Pro ever is here. With the blazing-fast M1 Pro or M1 Max chip — the first Apple
              silicon designed for pros — you get groundbreaking performance and amazing battery life. Add to that a
              stunning Liquid Retina XDR display, the best camera and audio ever in a Mac notebook, and all the ports
              you need. The first notebook of its kind, this MacBook Pro is a beast. M1 Pro takes the exceptional
              performance of the M1 architecture to a whole new level for pro users.
            </p>
            <p className="text-body-small-400 text-gray-600 mt-3">
              Even the most ambitious projects are easily handled with up to 10 CPU cores, up to 16 GPU cores, a 16‑core
              Neural Engine, and dedicated encode and decode media engines that support H.264, HEVC, and ProRes codecs.
            </p>
          </div>

          <div className="col-span-3">
            <h4 className="text-body-medium-600">Feature</h4>
            <div className="mt-4 space-y-3">
              <div className="flex gap-2 items-center">
                <Medal />
                <span className="text-body-small-400">Free 1 Year Warranty</span>
              </div>

              <div className="flex gap-2 items-center">
                <Truck />
                <span className="text-body-small-400">Free Shipping & Fasted Delivery</span>
              </div>

              <div className="flex gap-2 items-center">
                <Handshake />
                <span className="text-body-small-400">100% Money-back guarantee</span>
              </div>

              <div className="flex gap-2 items-center">
                <Headphones />
                <span className="text-body-small-400">24/7 Customer support</span>
              </div>

              <div className="flex gap-2 items-center">
                <CreditCard />
                <span className="text-body-small-400">Secure payment method</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-6 my-[72]">
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-body-medium-600">RELATED PRODUCT</span>
            </div>

            {/* --- Grid các sản phẩm --- */}
            <div className="space-y-4">
              {/* Product Card */}
              {Array(3)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-[3px] h-[104] gap-3 border border-gray-100 flex shadow-sm hover:shadow-md transition overflow-hidden p-3"
                  >
                    <div className="w-full bg-gray-100 flex items-center justify-center">Image</div>
                    <div className="">
                      <h3 className="text-body-small-400 mb-2 line-clamp-2">
                        Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...
                      </h3>
                      <div className="text-body-small-600 text-secondary-500">$1,500</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-body-medium-600">PRODUCT ACCESSORIES</span>
            </div>

            {/* --- Grid các sản phẩm --- */}
            <div className="space-y-4">
              {/* Product Card */}
              {Array(3)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-[3px] h-[104] gap-3 border border-gray-100 flex shadow-sm hover:shadow-md transition overflow-hidden p-3"
                  >
                    <div className="w-full bg-gray-100 flex items-center justify-center">Image</div>
                    <div className="">
                      <h3 className="text-body-small-400 mb-2 line-clamp-2">
                        Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...
                      </h3>
                      <div className="text-body-small-600 text-secondary-500">$1,500</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-body-medium-600">APPLE PRODUCT</span>
            </div>

            {/* --- Grid các sản phẩm --- */}
            <div className="space-y-4">
              {/* Product Card */}
              {Array(3)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-[3px] h-[104] gap-3 border border-gray-100 flex shadow-sm hover:shadow-md transition overflow-hidden p-3"
                  >
                    <div className="w-full bg-gray-100 flex items-center justify-center">Image</div>
                    <div className="">
                      <h3 className="text-body-small-400 mb-2 line-clamp-2">
                        Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...
                      </h3>
                      <div className="text-body-small-600 text-secondary-500">$1,500</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-body-medium-600">FEATURED PRODUCTS</span>
            </div>

            {/* --- Grid các sản phẩm --- */}
            <div className="space-y-4">
              {/* Product Card */}
              {Array(3)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-[3px] h-[104] gap-3 border border-gray-100 flex shadow-sm hover:shadow-md transition overflow-hidden p-3"
                  >
                    <div className="w-full bg-gray-100 flex items-center justify-center">Image</div>
                    <div className="">
                      <h3 className="text-body-small-400 mb-2 line-clamp-2">
                        Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...
                      </h3>
                      <div className="text-body-small-600 text-secondary-500">$1,500</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
