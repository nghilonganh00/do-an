"use client";

import { useGetCustomerByIdForAdmin } from "@/src/features/customer/hooks/useGetCustomerByIdForAdmin";
import { formatPriceVN } from "@/src/utils/formatPriceVN";
import { timeAgoRounded } from "@/src/utils/timeAgoRounded";
import dayjs from "dayjs";
import { useParams } from "next/navigation";

const CustomerDetailPage = () => {
  const { id } = useParams();

  const { data: customer } = useGetCustomerByIdForAdmin(Number(id));

  return (
    <div className="px-10 py-6 ">
      <div className="flex items-center justify-between">
        <span className="text-body-xl-600">Customer Information</span>

        <div className="flex items-center gap-3">
          <button className="h-10 px-6 border border-[#D7DBEC] bg-white text-[#1E5EFF] rounded-sm">Cancel</button>
          <button className="h-10 px-6 bg-[#1E5EFF] text-white rounded-sm">Save</button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-[30px] mt-8">
        <div className="col-span-8">
          <div className=" p-7 bg-white">
            <div className="flex items-start gap-[18px]">
              <div className="w-[72px] h-[72px] rounded-full bg-gray-700" />
              <div>
                <div className="font-semibold">{customer?.name || ""}</div>
                <div className="text-sm text-[#5A607F]">
                  {customer?.address}, {customer?.state}, {customer?.city}, {customer?.country}
                </div>
                <div className="text-sm text-[#5A607F]">{customer?.orders?.length} Orders</div>
                <div className="text-sm text-[#5A607F]">Customer for {timeAgoRounded(customer?.created_at || "")}</div>
              </div>
            </div>
          </div>

          <div className="p-7 bg-white mt-[30px]">
            <h5 className="font-semibold">Customer Orders</h5>

            <table className="min-w-full mt-5 border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Order</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Order Status</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Price</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {customer?.orders?.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-800">{item.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {dayjs(item.created_at).format("hh:mm, DD-MM-YYYY")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.status}</td>

                    <td className="px-6 py-4 text-right text-sm text-gray-700">
                      {formatPriceVN(item?.totalAmount || 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-4 p-7 rounded-md bg-white">
          <div className="font-semibold">Overview</div>
          <div className="mt-6 text-[#A1A7C4]">Address</div>
          <div className="text-[#5A607F]">{`${customer?.address}, ${customer?.state}, ${customer?.city}, ${customer?.country}`}</div>
          <div className="mt-6 text-[#A1A7C4]">Email Address</div>
          <div className="text-[#5A607F]">{customer?.email}</div>
          <div className="mt-6 text-[#A1A7C4]">Phone</div>
          <div className="text-[#5A607F]">{customer?.phone}</div>

          <button className="text-[#F0142F] mt-[50px]">Delete Customer</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailPage;
