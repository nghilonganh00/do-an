"use client";

import { useGetCustomerByIdForAdmin } from "@/src/features/customer/hooks/useGetCustomerByIdForAdmin";
import { formatPriceVN } from "@/src/utils/formatPriceVN";
import { timeAgoRounded } from "@/src/utils/timeAgoRounded";
import dayjs from "dayjs";
import { useParams } from "next/navigation";

const CustomerDetailPage = () => {
  const { id } = useParams();

  const { data: customer } = useGetCustomerByIdForAdmin(Number(id));

  return (
    <div className="px-10 py-6">
      <div className="flex items-center justify-between">
        <span className="text-body-xl-600">Thông tin khách hàng</span>

        <div className="flex items-center gap-3">
          <button className="h-10 px-6 border border-[#D7DBEC] bg-white text-[#1E5EFF] rounded-sm">Hủy</button>
          <button className="h-10 px-6 bg-[#1E5EFF] text-white rounded-sm">Lưu</button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-[30px] mt-8">
        {/* Thông tin chính */}
        <div className="col-span-8">
          <div className="p-7 bg-white">
            <div className="flex items-start gap-[18px]">
              <div className="w-[72px] h-[72px] rounded-full bg-gray-700" />
              <div>
                <div className="font-semibold">{customer?.name || ""}</div>
                <div className="text-sm text-[#5A607F]">
                  {customer?.address}, {customer?.state}, {customer?.city}, {customer?.country}
                </div>
                <div className="text-sm text-[#5A607F]">{customer?.orders?.length} đơn hàng</div>
                <div className="text-sm text-[#5A607F]">Khách hàng từ {timeAgoRounded(customer?.created_at || "")}</div>
              </div>
            </div>
          </div>

          {/* Danh sách đơn hàng */}
          <div className="p-7 bg-white mt-[30px]">
            <h5 className="font-semibold">Đơn hàng của khách hàng</h5>

            <table className="min-w-full mt-5 border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Mã đơn</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ngày đặt</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Trạng thái</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Tổng tiền</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {customer?.orders?.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-800">{item.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {dayjs(item.created_at).format("HH:mm, DD-MM-YYYY")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.status}</td>

                    <td className="px-6 py-4 text-right text-sm text-gray-700">
                      {formatPriceVN(item?.totalAmount || 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tổng quan */}
        <div className="col-span-4 p-7 rounded-md bg-white">
          <div className="font-semibold">Tổng quan</div>

          <div className="mt-6 text-[#A1A7C4]">Địa chỉ</div>
          <div className="text-[#5A607F]">
            {`${customer?.address}, ${customer?.state}, ${customer?.city}, ${customer?.country}`}
          </div>

          <div className="mt-6 text-[#A1A7C4]">Email</div>
          <div className="text-[#5A607F]">{customer?.email}</div>

          <div className="mt-6 text-[#A1A7C4]">Số điện thoại</div>
          <div className="text-[#5A607F]">{customer?.phone}</div>

          <button className="text-[#F0142F] mt-[50px]">Xóa khách hàng</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailPage;
