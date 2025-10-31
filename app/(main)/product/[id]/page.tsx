import { ChevronUp, CreditCard, Heart, Star } from "@/src/components/icons";
import { Handshake } from "@/src/components/icons/Handshake";
import { Headphones } from "@/src/components/icons/Headphones";
import { Medal } from "@/src/components/icons/Medal";
import { ShoppingCartSimple } from "@/src/components/icons/ShoppingCartSimple";
import { Truck } from "@/src/components/icons/Truck";
import { X } from "@/src/components/icons/X";
import Header from "@/src/components/layout/Header";
import Image from "next/image";

export default function ProductDetailPage() {
  return (
    <div className="w-full">
      <Header />

      <div className="w-[80%] max-w-[1320px] mx-auto">
        <div className="flex gap-14 bg-white z-10 mt-8 rounded-sm">
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
                <div className="flex justify-between items-center px-4 py-3.5 border border-gray-100 rounded-xs">
                  <span className="text-body-small-400 mb-2">14-inch Liquid Retina XDR display</span>
                  <ChevronUp />
                </div>
              </div>

              <div className="col-span-6">
                <span className="text-body-small-400">Memory</span>
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
