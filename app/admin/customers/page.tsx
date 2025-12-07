"use client";

import { useGetAllCustomers } from "@/src/features/customer/hooks/useGetAllCustomers";
import { User } from "@/src/types/users";
import { formatPriceVN } from "@/src/utils/formatPriceVN";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const CustomersManagementPage = () => {
  const router = useRouter();

  const { data: response } = useGetAllCustomers({});
  const customers = useMemo(() => response?.data, [response]);

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
          <div className="w-[180px] h-12">{/* <Dropdown value="Filter" /> */}</div>

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
            {customers?.map((customer: User) => {
              const totalSpent = customer.payments?.reduce((acc, payment) => acc + (payment.amount || 0), 0);

              return (
                <tr
                  key={customer.id}
                  onClick={() => router.push(`/admin/customers/${customer.id}`)}
                  className="button hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-sm text-gray-800">{customer.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {customer.state}, {customer.city}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{customer.orders?.length || 0}</td>
                  <td className="px-6 py-4 text-right text-sm text-gray-700">{formatPriceVN(totalSpent || 0)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersManagementPage;
