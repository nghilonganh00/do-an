"use client";

import { Search } from "@/src/components/icons";
import { PAYMENT_STATUS } from "@/src/constants";
import { useGetAllOrders } from "@/src/features/order/hooks/useGetAllOrder";
import { Params } from "@/src/types";
import { formatPriceVN } from "@/src/utils/formatPriceVN";
import dayjs from "dayjs";

const OrderManagementPage = () => {
  const { data, isPending, error } = useGetAllOrders({
    page: 1,
    limit: 10,
    sortBy: "created_at",
    sortDir: "desc",
  } as Params);

  console.log("Orders data: ", data);

  return (
    <div className="px-10 py-6">
      <span className="text-body-xl-600">Đơn hàng</span>

      <div className="bg-white px-7 py-8 mt-4">
        <div className="flex gap-3">
          <div className="w-[180px] h-[48px]">{/* Dropdown lọc trạng thái (sẽ làm sau 😄) */}</div>

          <div className="col-span-5 flex items-center bg-white rounded-md shadow-sm overflow-hidden">
            <input
              type="text"
              placeholder="Tìm kiếm đơn hàng..."
              className="h-11 flex-1 px-4 py-2 outline-none text-gray-700 placeholder-gray-400"
            />
            <Search className="w-5 h-5 text-gray-500 mr-3" />
          </div>
        </div>

        <table className="min-w-full mt-5 border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Mã đơn</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ngày tạo</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Khách hàng</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Trạng thái thanh toán</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Trạng thái đơn hàng</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tổng tiền</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {data?.data?.map((order) => {
              const paymentStatus = order?.payments?.status;
              console.log("Payment status: ", JSON.stringify(order));

              return (
                <tr key={order.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-left text-sm text-gray-800">#{order.id}</td>

                  <td className="px-6 py-4 text-left text-sm text-gray-600">
                    {dayjs(order.created_at).format("HH:mm, DD-MM-YYYY")}
                  </td>

                  <td className="px-6 py-4 text-left text-sm text-gray-600">{order?.user?.name || ""}</td>

                  <td className="px-6 py-4 text-left text-sm">
                    {paymentStatus === PAYMENT_STATUS.PENDING ? (
                      <div className="inline-block text-yellow-700 bg-yellow-200 px-2 py-0.5 rounded-sm font-medium">
                        Chờ thanh toán
                      </div>
                    ) : (
                      <div className="inline-block text-green-700 bg-green-200 px-2 py-0.5 rounded-sm font-medium">
                        Đã thanh toán
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4 text-left text-sm">
                    <span className="text-blue-600 font-medium">{order?.status}</span>
                  </td>

                  <td className="px-6 py-4 text-left text-sm text-gray-800">
                    {formatPriceVN(order?.totalAmount || 0)}
                  </td>
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
