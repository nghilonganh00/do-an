"use client";

import Dropdown from "@/src/components/common/input/Dropdown";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const customers = [
  { id: 1, name: "Thiện", location: "Hanoi", orders: 5, spent: 1200 },
  { id: 2, name: "John Doe", location: "New York", orders: 3, spent: 980 },
  { id: 3, name: "Jane Smith", location: "London", orders: 8, spent: 1560 },
];

const CustomersManagementPage = () => {
  const router = useRouter();

  return (
    <div className="px-10 py-6 ">
      <div className="flex items-center justify-between">
        <span className="text-body-xl-600">Customers</span>
        <button className="px-[30px] py-2 bg-[#1E5EFF] text-white" onClick={() => router.push("/admin/products/add")}>
          Add Customer
        </button>
      </div>

      <div className=" bg-white px-7 py-8 mt-[30px]">
        <div className="flex gap-3">
          <div className="w-[180px] h-[48px]">{/* <Dropdown value="Filter" /> */}</div>

          <div className=" flex items-center bg-white rounded-md shadow-sm overflow-hidden">
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
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Location</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Order</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Spent</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm text-gray-800">{customer.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{customer.location}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{customer.orders}</td>
                <td className="px-6 py-4 text-right text-sm text-gray-700">${customer.spent.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersManagementPage;
