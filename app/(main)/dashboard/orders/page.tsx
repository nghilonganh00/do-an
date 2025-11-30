"use client";

import { useGetMyOrderHistory } from "@/src/features/order/hooks/useGetMyOrderHistory";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { ORDER_STATUS } from "@/src/constants";

export default function OrderHistory() {
  const router = useRouter();

  const { data: orders } = useGetMyOrderHistory();

  return (
    <div className="border flex-1 border-gray-100">
      <h3 className="text-label-3 px-6 py-4">Order History</h3>
      <table className="w-full  border border-gray-50 rounded-md overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-4 text-left text-label-4 text-gray-700">
              Order ID
            </th>
            <th className="px-6 py-4 text-right text-label-4 text-gray-700 uppercase">
              Status
            </th>
            <th className="px-6 py-4 text-right text-label-4 text-gray-700 uppercase">
              Date
            </th>
            <th className="px-6 py-4 text-right text-label-4 text-gray-700 uppercase">
              Total
            </th>
            <th className="px-6 py-4 text-right text-label-4 text-gray-700 uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((item, index) => {
            return (
              <tr
                onClick={() => router.push(`/dashboard/orders/${item.id}`)}
                key={index}
                className="border-t border-gray-200"
              >
                <td className="px-6 py-4">{item?.id}</td>
                <td
                  className={`px-6 py-4 text-right ${
                    item?.status === ORDER_STATUS.COMPLETED
                      ? "text-success-500"
                      : "text-primary-500"
                  }`}
                >
                  {item?.status
                    ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
                    : ""}
                </td>
                <td className="px-6 py-4 text-right">
                  {dayjs(item?.createdAt).format("MMM DD, YYYY hh:mm A")}
                </td>
                <td className="px-6 py-4 text-right">{item?.totalAmount}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    className="text-secondary-500"
                    onClick={() => router.push("/dashboard/order-detail")}
                  >
                    View Details
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
