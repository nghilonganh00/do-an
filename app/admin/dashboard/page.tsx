"use client";

import { useGetAllOrdersForAdmin } from "@/src/features/order/hooks/useGetAllOrdersForAdmin";
import { useGetAllPaymentsForAdmin } from "@/src/features/payments/hooks/useAllPaymentsForAdmin";
import { UseGetAllBestSellingProductVariantOptions } from "@/src/features/products/hooks/useGetAllBestSellingProductVariant";
import { Order } from "@/src/types/order";
import { formatPriceVN } from "@/src/utils/formatPriceVN";
import dayjs from "dayjs";
import { useMemo } from "react";
import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const paymentStatusConfig: Record<string, { label: string; className: string }> = {
  pending: {
    label: "Đang chờ",
    className: "bg-yellow-100 text-yellow-700",
  },
  paid: {
    label: "Đã thanh toán",
    className: "bg-green-100 text-green-700",
  },
};

const DashboardPage = () => {
  const { data: payments } = useGetAllPaymentsForAdmin({ params: { limit: 10 } });

  const { data: products } = UseGetAllBestSellingProductVariantOptions({ params: { duration: 30 } });

  const { data: orders } = useGetAllOrdersForAdmin({
    params: {
      limit: 1000,
      page: 1,
      sortBy: "created_at",
      sortDir: "asc",
      duration: 1,
    },
  });

  const convertOrdersByHour = (orders: Order[] = []) => {
    const map = new Map();

    for (const order of orders) {
      const date = new Date(order.created_at || "");
      const hour = date.getHours().toString().padStart(2, "0") + ":00";

      map.set(hour, (map.get(hour) || 0) + 1);
    }

    return Array.from(map, ([name, value]) => ({ name, value }));
  };

  const chartData = useMemo(() => {
    if (!orders) return [];
    return convertOrdersByHour(orders.sort((a, b) => dayjs(a.created_at).unix() - dayjs(b.created_at).unix()));
  }, [orders]);

  return (
    <div className="px-10 py-6 ">
      <span className="text-body-xl-600">Tổng quan</span>

      <div className="flex justify-between mt-6">
        <div className="flex flex-col bg-white rounded-md px-11 py-1.5">
          <span className="text-body-medium-600">$10.540</span>
          <span>Tổng doanh thu</span>
          <span className="text-[#06A561]">22.45%</span>
        </div>

        <div className="flex flex-col bg-white rounded-md px-11 py-1.5">
          <span className="text-body-medium-600">$10.540</span>
          <span>Tổng doanh thu</span>
          <span className="text-[#06A561]">22.45%</span>
        </div>

        <div className="flex flex-col bg-white rounded-md px-11 py-1.5">
          <span className="text-body-medium-600">$10.540</span>
          <span>Tổng doanh thu</span>
          <span className="text-[#06A561]">22.45%</span>
        </div>

        <div className="flex flex-col bg-white rounded-md px-11 py-1.5">
          <span className="text-body-medium-600">$10.540</span>
          <span>Tổng doanh thu</span>
          <span className="text-[#06A561]">22.45%</span>
        </div>

        <div className="flex flex-col bg-white rounded-md px-11 py-1.5">
          <span className="text-body-medium-600">$10.540</span>
          <span>Tổng doanh thu</span>
          <span className="text-[#06A561]">22.45%</span>
        </div>
      </div>

      <div className="p-7 bg-white mt-7">
        <div className="flex items-center justify-between">
          <span className="text-body-medium-600">Đơn hàng theo thời gian</span>
          <span>12 giờ gần nhất</span>
        </div>

        <div className="w-full h-72 p-4 bg-white rounded-xl shadow">
          <ResponsiveContainer width="100%" height="100%">
            <ReLineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} dot={true} />
            </ReLineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-[30px] mt-6">
        <div className="col-span-6 p-7 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-body-medium-600">Giao dịch gần đây</span>

            <button className="text-blue-700">Xem chi tiết</button>
          </div>

          <table className="min-w-full mt-5">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tên</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Ngày</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Số tiền</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Trạng thái</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {payments?.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-4 text-sm text-gray-800">{payment.user?.name}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {dayjs(payment?.created_at).format("HH:MM, DD/MM")}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{formatPriceVN(payment?.amount || 0)}</td>
                  <td className="px-4 py-4 text-right">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                      ${paymentStatusConfig[payment?.status || "pending"]?.className ?? "bg-gray-100 text-gray-600"}`}
                    >
                      {paymentStatusConfig[payment?.status || "pending"]?.label ?? payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-span-6 p-7 bg-white">
          <span className="text-body-xl-600">Sản phẩm bán chạy nhất</span>

          <table className="min-w-full mt-5">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tên</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Giá</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Số lượng bán</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {products?.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {product.product?.name} ({product.variantName})
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.soldcount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
