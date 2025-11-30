"use client";

import Dropdown from "@/src/components/common/input/Dropdown";
import ProductGallery from "@/src/components/common/ProductGallery";
import Stepper from "@/src/components/common/Stepper";
import { CreditCard, Heart, Star } from "@/src/components/icons";
import { Handshake } from "@/src/components/icons/Handshake";
import { Headphones } from "@/src/components/icons/Headphones";
import { Medal } from "@/src/components/icons/Medal";
import { ShoppingCartSimple } from "@/src/components/icons/ShoppingCartSimple";
import { Truck } from "@/src/components/icons/Truck";
import { useGetProductById } from "@/src/features/products/hooks/useGetProductById";
import { useAddToCart } from "@/src/features/shoppingCart/hooks/useAddToCart";
import { ProductVariant, ProductOptionValue } from "@/src/types/product";
import { formatPriceVN } from "@/src/utils/formatPriceVN";
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

  const [shoppingCardItem, setShoppingCardItem] =
    useState<ShoppingCartItemState>({
      productId: Number(id),
      quantity: 1,
      couponId: null,
      variant: null,
    });
  const { data: product } = useGetProductById(id);
  const groupedOptions: Record<string, ProductOptionValue[]> = useMemo(() => {
    return (
      product?.options?.reduce<Record<string, ProductOptionValue[]>>(
        (acc, option) => {
          if (!option?.name) return acc;
          acc[option.name] = option.optionValues ?? [];
          return acc;
        },
        {}
      ) ?? {}
    );
  }, [product]);

  const [selectedGroupedOptions, setSelectedGroupedOptions] = useState<
    Record<string, ProductOptionValue>
  >({});

  const { mutate: addToCart } = useAddToCart();

  const handleAddToCart = useCallback(() => {
    if (!shoppingCardItem?.variant?.id) return;

    addToCart(
      {
        productVariantId: shoppingCardItem.variant.id,
        quantity: shoppingCardItem.quantity,
      },
      {
        onSuccess: () => {
          router.push("/shopping-cart");
        },
      }
    );
  }, [shoppingCardItem, router, addToCart]);

  const selectVariant = useCallback(
    (options: Record<string, ProductOptionValue>) => {
      const optionIds = Object.values(options).map((option) => option.id);

      const variant = product?.variants?.find((variant) => {
        if (!variant?.variantValues?.length) return false;

        const productVariantIds = variant.variantValues.map(
          (variantValue) => variantValue.optionValueId
        );
        return optionIds.every((id) => productVariantIds.includes(id!));
      });

      console.log("variant: ", variant);

      setShoppingCardItem((prev) => ({
        ...prev,
        variant: variant ?? null,
      }));
    },
    [product]
  );

  const handleSelectPrimaryOption = useCallback(
    (optionValue: ProductOptionValue) => {
      const newOptions: Record<string, ProductOptionValue> = {};

      Object.keys(groupedOptions).forEach((key) => {
        newOptions[key] =
          key === optionValue.option?.name
            ? optionValue
            : groupedOptions[key][0];
      });

      selectVariant(newOptions);

      setSelectedGroupedOptions(newOptions);
    },
    [groupedOptions, selectVariant]
  );

  const handleSelectSecondaryOption = useCallback(
    (optionValue: ProductOptionValue) => {
      setSelectedGroupedOptions((prev) => {
        const newOptions = {
          ...prev,
          [optionValue.option?.name || ""]: optionValue,
        };

        selectVariant(newOptions);

        return newOptions;
      });
    },
    [selectVariant]
  );

  useEffect(() => {
    setShoppingCardItem((prev) => ({
      ...prev,
      productId: product?.id ?? 0,
      variant: product?.variants?.[0] ?? null,
    }));

    const initOptions = Object.keys(groupedOptions).reduce(
      (acc, key) => {
        acc[key] = groupedOptions[key][0];
        return acc;
      },
      {} as Record<string, ProductOptionValue>
    );

    selectVariant(initOptions);

    setSelectedGroupedOptions(initOptions);
  }, [product, groupedOptions, selectVariant]);

  console.log("variant: ", shoppingCardItem?.variant);

  return (
    <div className="w-full">
      <div className="w-[80%] max-w-[1320px] mx-auto">
        <div className="flex gap-14 bg-white z-10 mt-8 rounded-sm">
          <ProductGallery images={product?.images || []} />

          <div className="flex-1">
            <div className="flex gap-1.5 items-center">
              <div className="flex">
                {Array.from({ length: product?.stars || 5 }).map((_, index) => (
                  <Star key={index} />
                ))}
              </div>
              <span className="text-body-small-600">
                {product?.stars || 5} Star Rating
              </span>
              <span className="text-body-small-400 text-gray-600">
                (21,671 User feedback)
              </span>
            </div>
            <span className="text-body-xl-400 mt-2">{product?.name || ""}</span>
            <div className="mt-4">
              <div className="flex ">
                <div className="flex-1">
                  <span>Sku: {shoppingCardItem?.variant?.sku || ""}</span>
                </div>
                <div className="flex-1">
                  <span>
                    Availability:{" "}
                    <span className="text-success-500">In stock</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex mt-6 items-center">
              <span className="text-heading-3 text-secondary-500">
                {formatPriceVN(shoppingCardItem?.variant?.price || 0)}
              </span>
              <span className="text-lg text-gray-500 ml-1 line-through">
                {formatPriceVN(product?.variants?.[0].originalPrice || 0)}
              </span>
              <div className="ml-3 bg-warning-400 px-[10] py-[5]">
                <span className="text-body-small-600">
                  {Math.round(
                    (((product?.variants?.[0].originalPrice || 0) -
                      (product?.variants?.[0].price || 0)) /
                      (product?.variants?.[0].originalPrice || 1)) *
                      100
                  )}
                  % OFF
                </span>
              </div>
            </div>

            <div className="grid grid-cols-12 mt-3 gap-6">
              {selectedGroupedOptions &&
                Object.entries(groupedOptions)?.map(
                  ([categoryName, optionValues], index) => {
                    if (!optionValues || !optionValues[0]) return;

                    if (index === 0) {
                      return (
                        <div key={index} className="col-span-6">
                          <div className="text-body-small-400">
                            {categoryName}
                          </div>
                          <Dropdown
                            key={index}
                            value={selectedGroupedOptions[categoryName]}
                            options={groupedOptions[categoryName]}
                            onChange={handleSelectPrimaryOption}
                          />
                        </div>
                      );
                    }
                    return (
                      <div key={index} className="col-span-6">
                        <div className="text-body-small-400">
                          {categoryName}
                        </div>
                        <Dropdown
                          key={index}
                          value={selectedGroupedOptions[categoryName]}
                          options={groupedOptions[categoryName].filter(
                            (option) =>
                              option.optionId ===
                              selectedGroupedOptions[categoryName]?.optionId
                          )}
                          onChange={handleSelectSecondaryOption}
                        />
                      </div>
                    );
                  }
                )}

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
            <div
              dangerouslySetInnerHTML={{ __html: product?.description || "" }}
            />
          </div>

          <div className="col-span-3">
            <h4 className="text-body-medium-600">Feature</h4>
            <div className="mt-4 space-y-3">
              <div className="flex gap-2 items-center">
                <Medal />
                <span className="text-body-small-400">
                  Free 1 Year Warranty
                </span>
              </div>

              <div className="flex gap-2 items-center">
                <Truck />
                <span className="text-body-small-400">
                  Free Shipping & Fasted Delivery
                </span>
              </div>

              <div className="flex gap-2 items-center">
                <Handshake />
                <span className="text-body-small-400">
                  100% Money-back guarantee
                </span>
              </div>

              <div className="flex gap-2 items-center">
                <Headphones />
                <span className="text-body-small-400">
                  24/7 Customer support
                </span>
              </div>

              <div className="flex gap-2 items-center">
                <CreditCard />
                <span className="text-body-small-400">
                  Secure payment method
                </span>
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
                    <div className="w-full bg-gray-100 flex items-center justify-center">
                      Image
                    </div>
                    <div className="">
                      <h3 className="text-body-small-400 mb-2 line-clamp-2">
                        Bose Sport Earbuds - Wireless Earphones - Bluetooth In
                        Ear...
                      </h3>
                      <div className="text-body-small-600 text-secondary-500">
                        $1,500
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-body-medium-600">PRODUCT ACCESSORIES</span>
            </div>

            <div className="space-y-4">
              {Array(3)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-[3px] h-[104] gap-3 border border-gray-100 flex shadow-sm hover:shadow-md transition overflow-hidden p-3"
                  >
                    <div className="w-full bg-gray-100 flex items-center justify-center">
                      Image
                    </div>
                    <div className="">
                      <h3 className="text-body-small-400 mb-2 line-clamp-2">
                        Bose Sport Earbuds - Wireless Earphones - Bluetooth In
                        Ear...
                      </h3>
                      <div className="text-body-small-600 text-secondary-500">
                        $1,500
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-body-medium-600">APPLE PRODUCT</span>
            </div>

            <div className="space-y-4">
              {Array(3)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-[3px] h-[104] gap-3 border border-gray-100 flex shadow-sm hover:shadow-md transition overflow-hidden p-3"
                  >
                    <div className="w-full bg-gray-100 flex items-center justify-center">
                      Image
                    </div>
                    <div className="">
                      <h3 className="text-body-small-400 mb-2 line-clamp-2">
                        Bose Sport Earbuds - Wireless Earphones - Bluetooth In
                        Ear...
                      </h3>
                      <div className="text-body-small-600 text-secondary-500">
                        $1,500
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-body-medium-600">FEATURED PRODUCTS</span>
            </div>

            <div className="space-y-4">
              {Array(3)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-[3px] h-[104] gap-3 border border-gray-100 flex shadow-sm hover:shadow-md transition overflow-hidden p-3"
                  >
                    <div className="w-full bg-gray-100 flex items-center justify-center">
                      Image
                    </div>
                    <div className="">
                      <h3 className="text-body-small-400 mb-2 line-clamp-2">
                        Bose Sport Earbuds - Wireless Earphones - Bluetooth In
                        Ear...
                      </h3>
                      <div className="text-body-small-600 text-secondary-500">
                        $1,500
                      </div>
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
