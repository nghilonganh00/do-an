"use client";

import Dropdown from "@/src/components/common/input/Dropdown";
import { Search } from "@/src/components/icons";
import { useGetOrdersQuery } from "@/src/features/order/hooks/useGetAllOrders";
import { Params } from "@/src/types";
import dayjs from "dayjs";

const OrderManagementPage = () => {
  const { data, isPending, error } = useGetOrdersQuery({
    page: 1,
    limit: 10,
    sortBy: "created_at",
    sortDir: "desc",
  } as Params);

  console.log("Orders data: ", data);

  return (
    <div className="px-10 py-6 ">
      <span className="text-body-xl-600">Orders</span>

      <div className=" bg-white px-7 py-8">
        <div className="flex gap-3">
          <div className="w-[180px] h-[48px]">
            <Dropdown value="Filter" />
          </div>

          <div className="col-span-5 flex items-center bg-white rounded-md shadow-sm overflow-hidden">
            <input
              type="text"
              placeholder="Search for anything..."
              className="h-11 flex-1 px-4 py-2 outline-none text-gray-700 placeholder-gray-400"
            />
            <Search className="w-5 h-5 text-gray-500 mr-3" />
          </div>
        </div>

        <table className="min-w-full mt-5 border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Order</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Payment status</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Order Status</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Total</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {data?.data?.map((order) => {
              return (
                <tr className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-800">#{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {dayjs(order.createdAt).format("HH:MM, YYYY-MM-DD")}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order?.user?.name || ""}</td>
                  <td className="px-6 py-4 text-right text-sm flex items-center justify-center">
                    <span className="text-green-600 font-medium">
                      {order?.payments?.[order?.payments.length - 1]?.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm">
                    <span className="text-blue-600 font-medium">{order?.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-gray-800">${order?.totalAmount || 0}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagementPage;
