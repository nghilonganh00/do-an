"use client";

import { ChevronUp, Heart, Package, Search, ShoppingCart, Star, User } from "@/src/components/icons";
import { ShoppingCartSimple } from "@/src/components/icons/ShoppingCartSimple";
import { X } from "@/src/components/icons/X";
import Header from "@/src/components/layout/Header";
import Image from "next/image";
import { useCallback, useState } from "react";

export default function HomePage() {
  const [isShowQuickView, setShowQuickView] = useState(true);

  const handleToggleQuickView = useCallback(() => {
    setShowQuickView((prev) => !prev);
  }, []);

  return (
    <>
      <div className="w-full ">
        <Header />

        <div className="max-w-[1320px] mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 bg-white p-4 rounded-md shadow-sm">
              <Package className="w-8 h-8 text-secondary-700 shrink-0" />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">Fasted Delivery</span>
                <span className="text-gray-500 text-sm">Delivery in 24/H</span>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-md shadow-sm">
              <Package className="w-8 h-8 text-secondary-700 shrink-0" />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">Fasted Delivery</span>
                <span className="text-gray-500 text-sm">Delivery in 24/H</span>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-md shadow-sm">
              <Package className="w-8 h-8 text-secondary-700 shrink-0" />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">Fasted Delivery</span>
                <span className="text-gray-500 text-sm">Delivery in 24/H</span>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-md shadow-sm">
              <Package className="w-8 h-8 text-secondary-700 shrink-0" />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">Fasted Delivery</span>
                <span className="text-gray-500 text-sm">Delivery in 24/H</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* --- Title --- */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Shop with Category</h2>

              {/* Arrows */}
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-primary hover:text-white transition">
                  <span className="material-icons">arrow_back</span>
                </button>
                <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-primary hover:text-white transition">
                  <span className="material-icons">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* --- Categories --- */}
            <div className="flex gap-6 overflow-x-auto no-scrollbar">
              {/* Category Card */}
              <div className="shrink-0 w-[205] h-[236] bg-white rounded-lg shadow hover:shadow-md transition flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded-full">Ảnh</div>
                <div className="font-medium text-gray-800">Computer & Laptop</div>
              </div>

              <div className="shrink-0 w-[205] h-[236] bg-white rounded-lg shadow hover:shadow-md transition flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded-full">Ảnh</div>
                <div className="font-medium text-gray-800">SmartPhone</div>
              </div>

              <div className="shrink-0 w-[205] h-[236] bg-white rounded-lg shadow hover:shadow-md transition flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded-full">Ảnh</div>
                <div className="font-medium text-gray-800">Headphone</div>
              </div>

              <div className="shrink-0 w-[205] h-[236] bg-white rounded-lg shadow hover:shadow-md transition flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded-full">Ảnh</div>
                <div className="font-medium text-gray-800">Accessories</div>
              </div>
            </div>
          </div>

          <div className="mt-[74px]">
            {/* --- Header --- */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Feature Products</h2>

              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex gap-3">
                  <button className="hover:text-primary">All Product</button>
                  <button className="hover:text-primary">Smart Phone</button>
                  <button className="hover:text-primary">Laptop</button>
                  <button className="hover:text-primary">Headphone</button>
                  <button className="hover:text-primary">Tv</button>
                </div>

                <button className="text-sm text-primary hover:underline">Browse All Product</button>
              </div>
            </div>

            {/* --- Products Grid --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Product Card */}
              <div className="bg-white p-4 rounded-md shadow hover:shadow-md transition">
                <div className="h-40 bg-gray-100 mb-4 flex items-center justify-center">Anh</div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-yellow-500">***** (738)</span>
                </div>
                <div className="text-gray-800 font-semibold mb-2">
                  TOZO T6 True Wireless Earbuds Bluetooth Headphone
                </div>
                <div className="text-primary font-bold text-lg">$70</div>
              </div>

              {/* Copy product card cho các sản phẩm khác */}
              <div className="bg-white p-4 rounded-md shadow hover:shadow-md transition">
                <div className="h-40 bg-gray-100 mb-4 flex items-center justify-center">Anh</div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-yellow-500">***** (738)</span>
                </div>
                <div className="text-gray-800 font-semibold mb-2">
                  TOZO T6 True Wireless Earbuds Bluetooth Headphone
                </div>
                <div className="text-primary font-bold text-lg">$70</div>
              </div>
            </div>
          </div>

          <div className="flex mt-[72]">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">FLASH SALE TODAY</h2>
              </div>

              {/* --- Grid các sản phẩm --- */}
              <div className="gap-6">
                {/* Product Card */}
                {Array(3)
                  .fill(0)
                  .map((_, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-lg h-[104] flex shadow-sm hover:shadow-md transition overflow-hidden p-3"
                    >
                      <div className="w-full  bg-gray-100 flex items-center justify-center">Image</div>
                      <div className="p-4">
                        <h3 className="text-gray-800 font-medium text-sm mb-2 line-clamp-2">
                          Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...
                        </h3>
                        <div className="text-primary-600 font-semibold text-lg">$1,500</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">FLASH SALE TODAY</h2>
              </div>

              {/* --- Grid các sản phẩm --- */}
              <div className="gap-6">
                {/* Product Card */}
                {Array(3)
                  .fill(0)
                  .map((_, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-lg h-[104] flex shadow-sm hover:shadow-md transition overflow-hidden p-3"
                    >
                      <div className="w-full  bg-gray-100 flex items-center justify-center">Image</div>
                      <div className="p-4">
                        <h3 className="text-gray-800 font-medium text-sm mb-2 line-clamp-2">
                          Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...
                        </h3>
                        <div className="text-primary-600 font-semibold text-lg">$1,500</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">FLASH SALE TODAY</h2>
              </div>

              {/* --- Grid các sản phẩm --- */}
              <div className="gap-6">
                {/* Product Card */}
                {Array(3)
                  .fill(0)
                  .map((_, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-lg h-[104] flex shadow-sm hover:shadow-md transition overflow-hidden p-3"
                    >
                      <div className="w-full  bg-gray-100 flex items-center justify-center">Image</div>
                      <div className="p-4">
                        <h3 className="text-gray-800 font-medium text-sm mb-2 line-clamp-2">
                          Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...
                        </h3>
                        <div className="text-primary-600 font-semibold text-lg">$1,500</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">FLASH SALE TODAY</h2>
              </div>

              {/* --- Grid các sản phẩm --- */}
              <div className="gap-6">
                {/* Product Card */}
                {Array(3)
                  .fill(0)
                  .map((_, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-lg h-[104] flex shadow-sm hover:shadow-md transition overflow-hidden p-3"
                    >
                      <div className="w-full  bg-gray-100 flex items-center justify-center">Image</div>
                      <div className="p-4">
                        <h3 className="text-gray-800 font-medium text-sm mb-2 line-clamp-2">
                          Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...
                        </h3>
                        <div className="text-primary-600 font-semibold text-lg">$1,500</div>
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
            <div className="absolute top-3 right-3" onClick={handleToggleQuickView}>
              <X />
            </div>
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
