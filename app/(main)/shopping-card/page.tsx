import { Line } from "@/src/components/common/Line";
import { ArrowRight } from "@/src/components/icons/ArrowRight";
import { X } from "@/src/components/icons/X";
import Header from "@/src/components/layout/Header";
import Image from "next/image";

export default function ShoppingCard() {
  return (
    <div className="w-full">
      <Header />

      <div className="max-w-[1320px] grid grid-cols-12 mt-[72px]">
        <div className="col-span-8">
          <div className="px-6 py-5 w-full">
            <h4 className="text-body-large-500">Shopping Card</h4>

            <table className="w-full border border-gray-200 rounded-md overflow-hidden mt-5">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Product</th>
                  <th className="px-4 py-2 text-right">Price</th>
                  <th className="px-4 py-2 text-right ">Quantity</th>
                  <th className="px-4 py-2 text-right">Sub Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-2 flex items-center gap-3">
                    <X />
                    <Image src={"/assets/images/smart-tv.png"} alt="Smart tv" width={72} height={72} />
                    <span>4K UHD LED Smart TV with Chromecast Built-in</span>
                  </td>
                  <td className="px-4 py-2 text-right">$70</td>
                  <td className="px-4 py-2 text-right w-12">
                    <div className="flex w-[148px] justify-between px-5 py-4 border border-gray-100 rounded-xs h-full">
                      <span>-</span>
                      <span>01</span>
                      <span>+</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-right">$70</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-2 flex items-center gap-3">
                    <X />
                    <Image src={"/assets/images/smart-tv.png"} alt="Smart tv" width={72} height={72} />
                    <span>4K UHD LED Smart TV with Chromecast Built-in</span>
                  </td>
                  <td className="px-4 py-2 text-right">$70</td>
                  <td className="px-4 py-2 text-right w-12">
                    <div className="flex w-[148px] justify-between px-5 py-4 border border-gray-100 rounded-xs h-full">
                      <span>-</span>
                      <span>01</span>
                      <span>+</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-right">$70</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-4">
          <div className="px-6 py-5 rounded-sm border border-gray-100">
            <span className="text-body-large-500">Card Totals</span>
            <div className="flex justify-between items-center mt-5">
              <span className="text-body-small-400 text-gray-600">Sub-total</span>
              <span className="text-body-small-500">$320</span>
            </div>
            <div className="flex justify-between items-center mt-3">
              <span className="text-body-small-400 text-gray-600">Shipping</span>
              <span className="text-body-small-500">Free</span>
            </div>
            <div className="flex justify-between items-center mt-3">
              <span className="text-body-small-400 text-gray-600">Discount</span>
              <span className="text-body-small-500">$24</span>
            </div>
            <div className="flex justify-between items-center mt-3">
              <span className="text-body-small-400 text-gray-600">Tax</span>
              <span className="text-body-small-500">$61.99</span>
            </div>
            <div className="flex justify-between items-center mt-8">
              <span className="text-body-medium-400 text-gray-600">Total</span>
              <span className="text-body-small-600">$357.99 USD</span>
            </div>

            <button className="w-full h-14 flex items-center justify-center gap-2 mt-6 bg-primary-500 rounded-xs">
              <span className="text-heading-7 text-gray">Proceed to Checkout</span>
              <ArrowRight />
            </button>
          </div>

          <div className="px-6 py-5 rounded-sm border border-gray-100">
            <span className="text-body-large-500">Coupon Code</span>
            <Line my={3} />
            <input className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2" placeholder="Email address" />
            <button className="w-56 h-14 flex items-center justify-center gap-2 mt-6 bg-secondary-500 rounded-xs">
              <span className="text-heading-7 text-gray">Apply Coupon</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
