"use client";

import { DISCOUNT_TYPE } from "@/src/constants";
import { useGetAllCoupons } from "@/src/features/coupon/hooks/useGetAllCoupons";
import dayjs from "dayjs";
import { Tag, TicketPercent } from "lucide-react";
import { useRouter } from "next/navigation";

const CouponDashboardScreen = () => {
  const router = useRouter();

  const { data: coupons } = useGetAllCoupons({});

  return (
    <div className="px-10 py-6">
      <div className="flex items-center justify-between">
        <span className="text-body-xl-600">Coupons</span>
        <button className="px-[30px] py-2 bg-[#1E5EFF] text-white" onClick={() => router.push("/admin/products/add")}>
          Add Coupons
        </button>
      </div>

      <div className="bg-white px-7 py-3 mt-6">
        <table className="w-full  border border-gray-50 rounded-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-label-4 text-gray-700 uppercase">Coupon Name</th>
              <th className="px-6 py-4 text-left text-label-4 text-gray-700 uppercase">Thời gian</th>
              <th className="px-6 py-4 text-left text-label-4 text-gray-700 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-label-4 text-gray-700 uppercase">Total</th>
            </tr>
          </thead>
          <tbody>
            {coupons?.map((item, index) => {
              return (
                <tr
                  key={index}
                  onClick={() => router.push("/admin/coupons/add")}
                  className="button border-t border-gray-200"
                >
                  <td className="px-6 py-4 flex items-center gap-2">
                    {item?.discountType === DISCOUNT_TYPE.PERCENT ? (
                      <div className="w-12 h-12 flex items-center justify-center rounded-sm bg-blue-600">
                        <TicketPercent className="text-white" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 flex items-center justify-center rounded-sm bg-gray-200">
                        <Tag />
                      </div>
                    )}
                    <div>
                      <h3>{item?.code || ""}</h3>
                      <span className="text-gray-700">{item?.description || ""}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium text-gray-800">Từ:</span>{" "}
                        {dayjs(item?.validFrom).format("HH:mm, DD/MM/YYYY")}
                      </div>

                      <div className="text-sm text-gray-600">
                        <span className="font-medium text-gray-800">Đến:</span>{" "}
                        {dayjs(item?.validTo).format("HH:mm, DD/MM/YYYY")}
                      </div>
                    </div>
                  </td>
                  <td className={`px-6 py-4`}>
                    <div
                      className={`inline-block px-2 py-1 ${item?.active ? "text-success-500" : "text-primary-500"} ${item?.active ? "bg-success-50" : "text-orange-300"}`}
                    >
                      {item?.active ? "Active" : "Expired"}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-left">
                    {item?.discountType === DISCOUNT_TYPE.PERCENT
                      ? `${(item?.discountValue || 0) * 100}%`
                      : item?.discountValue}
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

export default CouponDashboardScreen;
