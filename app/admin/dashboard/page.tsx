"use client";

import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", value: 40 },
  { name: "Feb", value: 55 },
  { name: "Mar", value: 60 },
  { name: "Apr", value: 80 },
  { name: "May", value: 75 },
  { name: "Jun", value: 90 },
];

const DashboardPage = () => {
  return (
    <div className="px-10 py-6 ">
      <span className="text-body-xl-600">Dashboard</span>

      <div className="flex justify-between mt-6">
        <div className="flex flex-col bg-white rounded-md px-11 py-1.5">
          <span className="text-body-medium-600">$10.540</span>
          <span>Total Reven</span>
          <span className="text-[#06A561]">22.45%</span>
        </div>

        <div className="flex flex-col bg-white rounded-md px-11 py-1.5">
          <span className="text-body-medium-600">$10.540</span>
          <span>Total Reven</span>
          <span className="text-[#06A561]">22.45%</span>
        </div>

        <div className="flex flex-col bg-white rounded-md px-11 py-1.5">
          <span className="text-body-medium-600">$10.540</span>
          <span>Total Reven</span>
          <span className="text-[#06A561]">22.45%</span>
        </div>

        <div className="flex flex-col bg-white rounded-md px-11 py-1.5">
          <span className="text-body-medium-600">$10.540</span>
          <span>Total Reven</span>
          <span className="text-[#06A561]">22.45%</span>
        </div>

        <div className="flex flex-col bg-white rounded-md px-11 py-1.5">
          <span className="text-body-medium-600">$10.540</span>
          <span>Total Reven</span>
          <span className="text-[#06A561]">22.45%</span>
        </div>
      </div>

      <div className="p-7 bg-white mt-7">
        <div className="flex items-center justify-between">
          <span className="text-body-medium-600">Orders Over Time</span>
          <span>Last 12 Hours</span>
        </div>

        <div className="w-full h-72 p-4 bg-white rounded-xl shadow">
          <ResponsiveContainer width="100%" height="100%">
            <ReLineChart data={data}>
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
          <span className="text-body-medium-600">Recent Transactions</span>

          <table className="min-w-full mt-5">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm text-gray-800">Jagarnath S.</td>
                <td className="px-6 py-4 text-sm text-gray-600">24.05.2023</td>
                <td className="px-6 py-4 text-sm text-gray-600">$124.97</td>
                <td className="px-6 py-4 text-sm text-gray-600">Paid</td>
              </tr>

              <tr className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm text-gray-800">Jagarnath S.</td>
                <td className="px-6 py-4 text-sm text-gray-600">24.05.2023</td>
                <td className="px-6 py-4 text-sm text-gray-600">$124.97</td>
                <td className="px-6 py-4 text-sm text-gray-600">Paid</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="col-span-6 p-7 bg-white">
          <span className="text-body-xl-600">Top Products by Units Sold</span>

          <table className="min-w-full mt-5">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Units Sold</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm text-gray-800">Jagarnath S.</td>
                <td className="px-6 py-4 text-sm text-gray-600">24.05.2023</td>
                <td className="px-6 py-4 text-sm text-gray-600">$124.97</td>
              </tr>

              <tr className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm text-gray-800">Jagarnath S.</td>
                <td className="px-6 py-4 text-sm text-gray-600">24.05.2023</td>
                <td className="px-6 py-4 text-sm text-gray-600">$124.97</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
