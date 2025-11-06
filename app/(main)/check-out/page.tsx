import CheckBox from "@/src/components/common/input/Checkbox";
import { ArrowRight } from "@/src/components/icons/ArrowRight";
import { Check } from "@/src/components/icons/Check";
import { Stack } from "@/src/components/icons/Stack";
import Header from "@/src/components/layout/Header";
import Image from "next/image";

export default function CheckoutPage() {
  const isSucess = true;

  return (
    <>
      {!isSucess ? (
        <div className="max-w-[1320px] mx-auto py-[72px] grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <h3 className="text-body-large-500">Billing Information</h3>

            <div className="grid grid-cols-12 gap-4 mt-6">
              <div className="col-span-3 flex flex-col justify-end">
                <label>User name</label>
                <input placeholder="First name" className="px-4 py-3 border border-gray-100 mt-1.5" />
              </div>

              <div className="col-span-3 flex flex-col justify-end">
                <input placeholder="Last name" className="px-4 py-3 border border-gray-100 mt-1.5" />
              </div>

              <div className="col-span-6 flex flex-col justify-end">
                <label>Company Name</label>
                <input className="px-4 py-3 border border-gray-100 mt-1.5" />
              </div>

              <div className="col-span-12 flex flex-col justify-end">
                <label>Address</label>
                <input className="px-4 py-3 border border-gray-100 mt-1.5" />
              </div>

              <div className="col-span-3 flex flex-col justify-end">
                <label>Country</label>
                <input placeholder="Country" className="px-4 py-3 border border-gray-100 mt-1.5" />
              </div>
              <div className="col-span-3 flex flex-col justify-end">
                <label>Region/State</label>
                <input placeholder="Country" className="px-4 py-3 border border-gray-100 mt-1.5" />
              </div>
              <div className="col-span-3 flex flex-col justify-end">
                <label>City</label>
                <input placeholder="Country" className="px-4 py-3 border border-gray-100 mt-1.5" />
              </div>
              <div className="col-span-3 flex flex-col justify-end">
                <label>Zip Code</label>
                <input placeholder="Country" className="px-4 py-3 border border-gray-100 mt-1.5" />
              </div>
              <div className="col-span-6 flex flex-col justify-end">
                <label>Email</label>
                <input className="px-4 py-3 border border-gray-100 mt-1.5" />
              </div>
              <div className="col-span-6 flex flex-col justify-end">
                <label>Phone number</label>
                <input placeholder="Country" className="px-4 py-3 border border-gray-100 mt-1.5" />
              </div>
            </div>

            <CheckBox title="Ship into different address" style={{ marginTop: 24, marginBottom: 40 }} />
          </div>

          <div className="col-span-4 px-6 py-5 rounded-sm border border-gray-100">
            <h3 className="text-body-large-500">Order Summery</h3>

            <div className="mt-5">
              <div className="flex items-center gap-6">
                <Image src="/assets/images/smart-tv.png" alt="Smart Tv" width={64} height={64} />

                <div className="">
                  <h4 className="text-body-small-400">Canon EOS 1500D DSLR Camera Body+ 18-...</h4>

                  <div className="mt-2">
                    <span className="text-body-small-400 text-gray-600">1 x</span>
                    <span className="text-body-small-600 text-secondary-500 ml-1">$1,500</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <Image src="/assets/images/smart-tv.png" alt="Smart Tv" width={64} height={64} />

                <div className="">
                  <h4 className="text-body-small-400">Canon EOS 1500D DSLR Camera Body+ 18-...</h4>

                  <div className="mt-2">
                    <span className="text-body-small-400 text-gray-600">1 x</span>
                    <span className="text-body-small-600 text-secondary-500 ml-1">$1,500</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="">
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
                <span className="text-body-medium-400 text-gray-900">Total</span>
                <span className="text-body-small-600">$357.99 USD</span>
              </div>

              <button className="w-full h-14 flex items-center justify-center gap-2 mt-6 bg-primary-500 rounded-xs">
                <span className="text-heading-7 text-gray uppercase">Place order</span>
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-[1320px] mx-auto h-full">
          <div className="max-w-[424px] mt-40 mx-auto flex flex-col items-center">
            <div className="w-[66px] h-[66px] flex items-center justify-center border-4 border-success-500 rounded-full">
              <Check size={30} color="#2DB224" />
            </div>

            <span className="text-heading-3 leading-0">Your order is successfully place</span>
            <span className="text-body-small-400 text-[#5F6C72] text-center">
              Pellentesque sed lectus nec tortor tristique accumsan quis dictum risus. Donec volutpat mollis nulla non
              facilisis.
            </span>

            <div className="w-full flex items-center justify-between gap-3">
              <button className="w-full h-12 flex-1 flex items-center justify-center gap-2 mt-6 border-2 border-primary-100 rounded-xs">
                <Stack color="#FA8232" />
                <span className="text-heading-7 text-primary-500">Go to Dashboard</span>
              </button>

              <button className="w-full h-12 flex-1 flex items-center justify-center gap-2 mt-6 bg-primary-500 rounded-xs">
                <span className="text-heading-7 text-gray">View Order</span>
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
