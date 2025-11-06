"use client";

import DashboardSidebar from "@/src/components/common/sidebar/DashboardSidebar";
import { Stack } from "@/src/components/icons/Stack";
import Header from "@/src/components/layout/Header";
import { useRouter } from "next/navigation";

const data = [
  {
    product: "#96459761",
    status: "IN PROGRESS",
    date: "Dec 30, 2019 07:52",
    total: "$80 (5 Products)",
  },
  {
    product: "#96459761",
    status: "COMPLETED",
    date: "Dec 7, 2019 23:26",
    total: "$70 (4 Products)",
  },
  {
    product: "#96459761",
    status: "IN PROGRESS",
    date: "Dec 30, 2019 07:52",
    total: "$80 (5 Products)",
  },
  {
    product: "#96459761",
    status: "IN PROGRESS",
    date: "Dec 30, 2019 07:52",
    total: "$80 (5 Products)",
  },
  {
    product: "#96459761",
    status: "IN PROGRESS",
    date: "Dec 30, 2019 07:52",
    total: "$80 (5 Products)",
  },
];

export default function OrderHistory() {
  const router = useRouter();

  return (
    <div className="w-full">
      <div className="max-w-[1320px] mx-auto flex items-start gap-16 mt-10">
        <DashboardSidebar />

        <div className="border flex-1 border-gray-100">
          <h3 className="text-label-3 px-6 py-4">Order History</h3>
          <table className="w-full  border border-gray-50 rounded-md overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-label-4 text-gray-700">Order ID</th>
                <th className="px-6 py-4 text-right text-label-4 text-gray-700 uppercase">Status</th>
                <th className="px-6 py-4 text-right text-label-4 text-gray-700 uppercase">Date</th>
                <th className="px-6 py-4 text-right text-label-4 text-gray-700 uppercase">Total</th>
                <th className="px-6 py-4 text-right text-label-4 text-gray-700 uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="px-6 py-4">{item.product}</td>
                    <td
                      className={`px-6 py-4 text-right ${
                        item.status === "IN PROGRESS" ? "text-primary-500" : "text-success-500"
                      }`}
                    >
                      {item.status}
                    </td>
                    <td className="px-6 py-4 text-right">{item.date}</td>
                    <td className="px-6 py-4 text-right">{item.total}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-secondary-500" onClick={() => router.push("/dashboard/order-detail")}>
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
