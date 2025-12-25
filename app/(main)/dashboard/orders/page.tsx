"use client";

import { useGetMyOrderHistory } from "@/src/features/order/hooks/useGetMyOrderHistory";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { ORDER_STATUS } from "@/src/constants";

export default function OrderHistory() {
  const router = useRouter();

  const { data } = useGetMyOrderHistory();

  return (
    <div className="border flex-1 border-gray-100">
      <h3 className="text-label-3 px-6 py-4">Lịch sử đơn hàng</h3>

      <table className="w-full border border-gray-50 rounded-md overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-4 text-left text-label-4 text-gray-700">Mã đơn hàng</th>
            <th className="px-6 py-4 text-right text-label-4 text-gray-700 uppercase">Trạng thái</th>
            <th className="px-6 py-4 text-right text-label-4 text-gray-700 uppercase">Ngày đặt</th>
            <th className="px-6 py-4 text-right text-label-4 text-gray-700 uppercase">Tổng tiền</th>
            <th className="px-6 py-4 text-right text-label-4 text-gray-700 uppercase">Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {data?.data?.map((item, index) => {
            return (
              <tr
                key={index}
                onClick={() => router.push(`/dashboard/orders/${item.id}`)}
                className="border-t border-gray-200 cursor-pointer hover:bg-gray-50"
              >
                <td className="px-6 py-4">{item?.id}</td>

                <td
                  className={`px-6 py-4 text-right ${
                    item?.status === ORDER_STATUS.COMPLETED ? "text-success-500" : "text-primary-500"
                  }`}
                >
                  {item?.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : ""}
                </td>

                <td className="px-6 py-4 text-right">{dayjs(item?.created_at).format("DD/MM/YYYY HH:mm")}</td>

                <td className="px-6 py-4 text-right">{item?.totalAmount}</td>

                <td className="px-6 py-4 text-right">
                  <button
                    className="text-secondary-500 hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push("/dashboard/order-detail");
                    }}
                  >
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
