"use client";

import Dropdown, { DropdownItem } from "@/src/components/common/input/Dropdown";
import { Search } from "@/src/components/icons";
import { PAYMENT_STATUS, PAYMENT_STATUS_LIST } from "@/src/constants";
import { useGetAllPaymentsForAdmin } from "@/src/features/payments/hooks/useAllPaymentsForAdmin";
import { formatPriceVN } from "@/src/utils/formatPriceVN";
import dayjs from "dayjs";
import React, { useState } from "react";

const PAYMENT_STATUS_OPTIONS: DropdownItem[] = [
  {
    label: "Tất cả",
    value: "",
  },
  {
    label: "Chưa thanh toán",
    value: PAYMENT_STATUS.PENDING,
  },
  {
    label: "Thanh toán",
    value: PAYMENT_STATUS.PAID,
  },
];

const PaymentPage = () => {
  const [status, setStatus] = useState<PAYMENT_STATUS | null>(null);
  const [search, setSearch] = useState("");

  const { data, isPending, error } = useGetAllPaymentsForAdmin({ params: { status } });

  return (
    <div className="px-10 py-6">
      <span className="text-body-xl-600">Đơn hàng</span>

      <div className="bg-white px-7 py-8 mt-4">
        <div className="flex gap-3">
          <div className="w-[180px] h-[48px]">
            <Dropdown
              options={PAYMENT_STATUS_OPTIONS}
              onChange={(DropdownItem) => setStatus(DropdownItem.value as PAYMENT_STATUS)}
            />
          </div>

          <div className="col-span-5 flex items-center bg-white rounded-md shadow-sm overflow-hidden">
            <input
              type="text"
              placeholder="Tìm kiếm đơn hàng..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tổng tiền</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {data?.map((payment) => {
              const paymentStatus = payment?.status;

              return (
                <tr key={payment.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-left text-sm text-gray-800">{payment.id}</td>

                  <td className="px-6 py-4 text-left text-sm text-gray-600">
                    {dayjs(payment.created_at).add(7, "hour").format("HH:mm, DD-MM-YYYY")}
                  </td>

                  <td className="px-6 py-4 text-left text-sm text-gray-600">{payment?.user?.name || ""}</td>

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

                  <td className="px-6 py-4 text-left text-sm text-gray-800">{formatPriceVN(payment?.amount || 0)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentPage;
