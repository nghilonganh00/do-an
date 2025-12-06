"use client";

import Dropdown, { DropdownItem } from "@/src/components/common/input/Dropdown";
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
import { ProductVariant } from "@/src/types/product";
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

  const [showedImage, setShowedImage] = useState<string>();
  const [shoppingCardItem, setShoppingCardItem] = useState<ShoppingCartItemState>({
    productId: Number(id),
    quantity: 1,
    couponId: null,
    variant: null,
  });
  const { data: product } = useGetProductById(id);
  const categoryDropdownItems: DropdownItem[] = useMemo(
    () =>
      product?.variants?.map((variant) => ({ label: variant?.variantName || "", value: variant.id.toString() })) || [],
    [product]
  );

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

  const handleSelectVariant = useCallback(
    (variantItem: DropdownItem) => {
      console.log("item: ", variantItem);
      const selectedVariant = product?.variants?.find((variant) => variant.id === Number(variantItem.value));
      console.log("selected variant: ", selectedVariant);
      if (!selectedVariant) return;

      setShoppingCardItem((prev) => ({
        ...prev,
        variant: selectedVariant,
      }));

      setShowedImage(selectedVariant.thumbnail);
    },
    [product]
  );

  useEffect(() => {
    const firstVariant = product?.variants?.[0];
    if (firstVariant) {
      setShoppingCardItem((prev) => ({
        ...prev,
        variant: firstVariant,
      }));
    }
    setShowedImage(product?.images?.[0]);
  }, [product]);

  return (
    <div className="w-full">
      <div className="w-[80%] max-w-[1320px] mx-auto">
        <div className="flex gap-14 bg-white z-10 mt-8 rounded-sm">
          <ProductGallery key={showedImage} images={product?.images || []} showedImage={showedImage} />

          <div className="flex-1">
            <div className="flex gap-1.5 items-center">
              <div className="flex">
                {Array.from({ length: product?.stars || 5 }).map((_, index) => (
                  <Star key={index} />
                ))}
              </div>
              <span className="text-body-small-600">{product?.stars || 5} Star Rating</span>
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
              <span className="text-heading-3 text-secondary-500">
                {formatPriceVN(shoppingCardItem?.variant?.price || 0)}
              </span>
              <span className="text-lg text-gray-500 ml-1 line-through">
                {formatPriceVN(shoppingCardItem?.variant?.originalPrice || 0)}
              </span>
              <div className="ml-3 bg-warning-400 px-[10] py-[5]">
                <span className="text-body-small-600">
                  {Math.round(
                    (((shoppingCardItem?.variant?.originalPrice || 0) - (shoppingCardItem?.variant?.price || 0)) /
                      (shoppingCardItem?.variant?.originalPrice || 1)) *
                      100
                  )}
                  % OFF
                </span>
              </div>
            </div>

            <Dropdown
              value={{
                label: shoppingCardItem?.variant?.variantName || "",
                value: shoppingCardItem?.variant?.id.toString() || "",
              }}
              options={categoryDropdownItems}
              onChange={handleSelectVariant}
            />

            <div className="grid grid-cols-12 mt-3 gap-6">
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
            <div dangerouslySetInnerHTML={{ __html: product?.description || "" }} />
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

            <div className="space-y-4">
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

            <div className="space-y-4">
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

            <div className="space-y-4">
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
