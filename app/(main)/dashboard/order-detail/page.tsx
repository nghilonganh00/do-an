import { Stack } from "@/src/components/icons/Stack";
import { X } from "@/src/components/icons/X";
import Header from "@/src/components/layout/Header";
import Image from "next/image";

export default function OrderDetail() {
  return (
    <div className="w-full">
      <Header />
      <div className="max-w-[1320px] mx-auto flex items-start gap-16 mt-10">
        <div className="w-[264px] border border-gray-100 py-4">
          <div className="flex items-center px-6 py-2.5 gap-3">
            <Stack />
            <span className="text-body-small-400 text-gray-600">Dashboard</span>
          </div>

          <div className="flex items-center px-6 py-2.5 gap-3 bg-primary-500">
            <Stack color="" />
            <span className="text-body-small-600 text-gray">Order History</span>
          </div>

          <div className="flex items-center px-6 py-2.5 gap-3">
            <Stack />
            <span className="text-body-small-400 text-gray-600">Track Order</span>
          </div>

          <div className="flex items-center px-6 py-2.5 gap-3">
            <Stack />
            <span className="text-body-small-400 text-gray-600">Shopping Cart</span>
          </div>

          <div className="flex items-center px-6 py-2.5 gap-3">
            <Stack />
            <span className="text-body-small-400 text-gray-600">Wishlist</span>
          </div>

          <div className="flex items-center px-6 py-2.5 gap-3">
            <Stack />
            <span className="text-body-small-400 text-gray-600">Compare</span>
          </div>

          <div className="flex items-center px-6 py-2.5 gap-3">
            <Stack />
            <span className="text-body-small-400 text-gray-600">Cards & Address</span>
          </div>

          <div className="flex items-center px-6 py-2.5 gap-3">
            <Stack />
            <span className="text-body-small-400 text-gray-600">Browsing History</span>
          </div>

          <div className="flex items-center px-6 py-2.5 gap-3">
            <Stack />
            <span className="text-body-small-400 text-gray-600">Setting</span>
          </div>

          <div className="flex items-center px-6 py-2.5 gap-3">
            <Stack />
            <span className="text-body-small-400 text-gray-600">Log-out</span>
          </div>
        </div>

        <div className="">
          <div className="p-6 bg-warning-50 flex items-center justify-between">
            <div>
              <span className="text-body-xl-400">#96459761</span>
              <div className="text-body-small-400 text-gray-400">
                <span>4 Products</span>
                <span> • </span>
                <span>Order Placed in 17 Jan, 2021 at 7:32 PM</span>
              </div>
            </div>

            <span className="text-heading-2 text-secondary-500">$1199.00</span>
          </div>
          <div className="px-6 py-5 w-full border border-gray-100">
            <h4 className="text-body-large-500">Product (2)</h4>

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
                    <div className="flex flex-col">
                      <span className="text-body-tiny-600 text-secondary-500">SMARTPHONE</span>
                      <span>4K UHD LED Smart TV with Chromecast Built-in</span>
                    </div>
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

          <div className="flex items-center">
            <div className="px-6 py-8 border border-gray-100">
              <h3 className="text-body-large-500">Billing Address</h3>
              <div className="mt-6">
                <span className="text-body-small-500">Kevin Gilbert</span>
                <p className="text-body-small-400 text-gray-600">
                  East Tejturi Bazar, Word No. 04, Road No. 13/x, House no. 1320/C, Flat No. 5D, Dhaka - 1200,
                  Bangladesh
                </p>
                <div>
                  Phone Number:<span> +1-202-555-0118</span>
                </div>
                <div>
                  Email:<span> kevin.gilbert@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="px-6 py-8 border border-gray-100">
              <h3 className="text-body-large-500">Shipping Address</h3>
              <div className="mt-6">
                <span className="text-body-small-500">Kevin Gilbert</span>
                <p className="text-body-small-400 text-gray-600">
                  East Tejturi Bazar, Word No. 04, Road No. 13/x, House no. 1320/C, Flat No. 5D, Dhaka - 1200,
                  Bangladesh
                </p>
                <div>
                  Phone Number:<span> +1-202-555-0118</span>
                </div>
                <div>
                  Email:<span> kevin.gilbert@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
