"use client";

import ProductCard from "@/src/components/common/card/ProductCard";
import TabsBar from "@/src/components/common/TabsBar";
import { ChevronUp, Heart, Package, Star } from "@/src/components/icons";
import { ShoppingCartSimple } from "@/src/components/icons/ShoppingCartSimple";
import { Trophy } from "@/src/components/icons/Trophy";
import { X } from "@/src/components/icons/X";
import { useGetAllCategories } from "@/src/features/category/hooks/useGetAllCategories";
import { useGetAllFeatureProducts } from "@/src/features/products/hooks/useGetAllFeatureProducts";
import { useGetProducts } from "@/src/features/products/hooks/useGetProducts";
import { TabItem } from "@/src/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [isShowQuickView, setShowQuickView] = useState(true);
  const [topRatedProducts, setTopRatedProducts] = useState<any[]>([]);

  const { data: categories } = useGetAllCategories();

  const categoryTabs: TabItem[] =
    categories?.map((c) => ({
      value: c?.id || "",
      label: c.name || "",
    })) || [];

  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<TabItem | null>(null);
  const { data: products } = useGetProducts({
    params: { categoryId: selectedCategoryFilter?.value?.toString() || "" },
  });
  const { data: featureProducts, isLoading: isLoadingFeatureProducts } = useGetAllFeatureProducts();

  const handleToggleQuickView = useCallback(() => {
    setShowQuickView((prev) => !prev);
  }, []);

  const navigateToProductDetail = useCallback((id: string | null) => {
    if (!id) return;

    router.push(`/product/${id}`);
  }, []);

  console.log("product: ", topRatedProducts);

  return (
    <>
      <div className="w-full">
        <div className="max-w-[1320px] mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center gap-4 bg-white p-4 rounded-md shadow-sm">
              <Package className="w-8 h-8 text-secondary-700 shrink-0" />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">Fasted Delivery</span>
                <span className="text-gray-500 text-sm">Delivery in 24/H</span>
              </div>
            </div>

            <div className="flex flex-1 items-center gap-4 bg-white p-4 rounded-md shadow-sm">
              <Trophy className="w-8 h-8 text-secondary-700 shrink-0" />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">24 Hours Return</span>
                <span className="text-gray-500 text-sm">100% money-back guarantee</span>
              </div>
            </div>

            <div className="flex flex-1 items-center gap-4 bg-white p-4 rounded-md shadow-sm">
              <Package className="w-8 h-8 text-secondary-700 shrink-0" />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">Secure Payment</span>
                <span className="text-gray-500 text-sm">Your money is safe</span>
              </div>
            </div>

            <div className="flex flex-1 items-center gap-4 bg-white p-4 rounded-md shadow-sm">
              <Package className="w-8 h-8 text-secondary-700 shrink-0" />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">Support 24/7</span>
                <span className="text-gray-500 text-sm">Live contact/message</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* --- Title --- */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Shop with Category</h2>
            </div>

            {/* --- Categories --- */}
            <div className="flex gap-6 overflow-x-auto no-scrollbar">
              {categories?.map((category, index) => {
                return (
                  <div
                    key={index}
                    className="shrink-0 w-[205] h-[236] bg-white rounded-lg shadow hover:shadow-md transition flex flex-col items-center justify-center gap-3"
                  >
                    <img src={category?.image} alt={category?.name} width={148} height={148} />
                    <div className="font-medium text-gray-800">{category?.name}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-[74px]">
            {/* --- Header --- */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Sản phẩm nổi bật</h2>

              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex gap-3">
                  <TabsBar
                    tabs={categoryTabs}
                    activeTab={selectedCategoryFilter}
                    onChange={(category) => setSelectedCategoryFilter(category)}
                  />
                </div>

                <button
                  className="text-body-small-600 text-primary hover:underline text-primary-500"
                  onClick={() => router.push("/shop")}
                >
                  Browse All Product
                </button>
              </div>
            </div>

            <div className="grid grid-cols-10 gap-6">
              {featureProducts?.map((product) => (
                <ProductCard key={product.id} product={product} className="col-span-2" />
              ))}
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
                    <button
                      key={idx}
                      className="bg-white rounded-[3px] h-[104] gap-3 border border-gray-100 flex shadow-sm hover:shadow-md transition overflow-hidden p-3"
                      onClick={handleToggleQuickView}
                    >
                      <Image src={"/assets/images/smart-tv.png"} width={80} height={80} alt="Smart TV" />
                      <div className="">
                        <h3 className="text-body-small-400 mb-2 line-clamp-2">
                          Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...
                        </h3>
                        <div className="text-body-small-600 text-secondary-500">$1,500</div>
                      </div>
                    </button>
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
                      <Image src={"/assets/images/smart-tv.png"} width={80} height={80} alt="Smart TV" />
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
                      <Image src={"/assets/images/smart-tv.png"} width={80} height={80} alt="Smart TV" />
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
                      <Image src={"/assets/images/smart-tv.png"} width={80} height={80} alt="Smart TV" />
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

        <div className="h-[472] bg-black"></div>
      </div>

      {isShowQuickView && (
        <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center">
          <div className="absolute top-0 left-0 bg-black opacity-80 w-screen h-screen"></div>
          <div className="relative w-[80%] max-w-[1400] flex gap-14 bg-white z-10 p-10 rounded-sm">
            <button className="absolute top-3 right-3" onClick={handleToggleQuickView}>
              <X />
            </button>
            <div className="">
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

            <div className="">
              <div className="flex gap-1.5 items-center">
                <div className="flex">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>
                <span className="text-body-small-600">4.7 Star Rating</span>
                <span className="text-body-small-400 text-gray-600">(21,671 User feedback)</span>
              </div>
              <span className="text-body-xl-400 mt-2">
                2020 Apple MacBook Pro with Apple M1 Chip (13-inch, 8GB RAM, 256GB SSD Storage) - Space Gray
              </span>
              <div className="mt-4">
                <div className="flex ">
                  <div className="flex-1">
                    <span>Sku: A262461</span>
                  </div>
                  <div className="flex-1">
                    <span>
                      Availability: <span className="text-success-500">In stock</span>
                    </span>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-1">
                    <span>Sku: A262461</span>
                  </div>
                  <div className="flex-1">
                    <span>Category: Electronics Devices</span>
                  </div>
                </div>
              </div>

              <div className="flex mt-6 items-center">
                <span className="text-heading-3 text-secondary-500">$1699</span>
                <span className="text-lg text-gray-500 ml-1">$1999.9</span>
                <div className="ml-3 bg-warning-400 px-[10] py-[5]">
                  <span className="text-body-small-600">21% OFF</span>
                </div>
              </div>

              <div className="grid grid-cols-12 mt-3 gap-6">
                <div className="col-span-6">
                  <span className="text-body-small-400">Color</span>
                  <div className="flex gap-3 mt-2">
                    <div className="size-8 rounded-full bg-[#B1B5B8]" />
                    <div className="size-8 rounded-full bg-[#B1B5B8]" />
                  </div>
                </div>

                <div className="col-span-6">
                  <span className="text-body-small-400">Size</span>
                  <div className="flex gap-3 mt-2">
                    <div className="size-8 rounded-full bg-[#B1B5B8]" />
                    <div className="size-8 rounded-full bg-[#B1B5B8]" />
                  </div>
                </div>

                <div className="col-span-6">
                  <span className="text-body-small-400">Size</span>
                  <div className="flex justify-between items-center px-4 py-3.5 border border-gray-100 rounded-xs">
                    <span className="text-body-small-400 mb-2">16GB unified memory</span>
                    <ChevronUp />
                  </div>
                </div>

                <div className="col-span-6">
                  <span className="text-body-small-400">Storage</span>
                  <div className="flex justify-between items-center px-4 py-3.5 border border-gray-100 rounded-xs">
                    <span className="text-body-small-400 mb-2">1TV SSD Storage</span>
                    <ChevronUp />
                  </div>
                </div>

                <div className="col-span-12 grid grid-cols-12 gap-4 h-[56]">
                  <div className="col-span-3 flex justify-between px-5 py-4 border border-gray-100 rounded-xs h-full">
                    <span>-</span>
                    <span>01</span>
                    <span>+</span>
                  </div>
                  <div className="col-span-6 flex justify-center items-center bg-primary-500  h-full gap-3">
                    <span className="text-heading-3 text-gray">ADD TO CARD</span>
                    <ShoppingCartSimple />
                  </div>

                  <div className="col-span-3 h-full flex justify-center items-center border-2 border-primary-500 rounded-[3px]">
                    <span className="text-heading-6 text-primary-500">Buy now</span>
                  </div>
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
        </div>
      )}
    </>
  );
}
