"use client";

import { Line } from "@/src/components/common/Line";
import { Rock } from "@/src/components/icons/Rock";
import { ORDER_STATUS } from "@/src/constants";
import { useGetMyOrderHistory } from "@/src/features/order/hooks/useGetMyOrderHistory";
import { useGetMe } from "@/src/features/user/hooks/useGetMe";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const { data: user } = useGetMe();
  // const {data: provinces} =
  const { data: orders } = useGetMyOrderHistory();

  return (
    <div className="flex-1">
      <h3 className="text-body-xl-600">Hello, {user?.name}</h3>
      <p className="max-w-[422px] mt-3 text-body-small-400 text-gray-700">
        From your account dashboard. you can easily check & view your{" "}
        <span className="button text-body-small-500 text-secondary-500">Recent Orders</span>, manage your{" "}
        <span className="button text-body-small-500 text-secondary-500">Shipping and Billing Addresses</span> and edit
        your <span className="button text-body-small-500 text-secondary-500">Password </span> and{" "}
        <span className="buttontext-body-small-500 text-secondary-500">Account Details</span>.
      </p>

      <div className="grid grid-cols-12 gap-6 mt-6">
        <div className="col-span-4 border border-gray-100 rounded-sm">
          <div className="px-6 py-4">
            <h3 className=" text-label-3 uppercase">Account info</h3>
          </div>

          <Line />

          <div className="px-6 pb-6">
            <div className="flex items-center gap-4 pt-[22px] pb-6">
              <Image src={user?.avatar || ""} width={48} height={48} alt="My avatar" />

              <div>
                <h4 className="text-body-large-500">{user?.name}</h4>
                <p className="text-body-small-400 text-gray-600">{user?.email}</p>
              </div>
            </div>

            <div className="gap-2">
              <div className="flex items-center gap-4 ">
                <h3 className="text-body-small-400">Email</h3>
                <p className="text-body-small-400 text-gray-600">{user?.email}</p>
              </div>

              <div className="flex items-center gap-4 ">
                <h3 className="text-body-small-400">Phone</h3>
                <p className="text-body-small-400 text-gray-600">{user?.phone}</p>
              </div>
            </div>

            <button className="h-12 px-6 mt-[22px] uppercase border-2 rounded-sm border-secondary-500 text-heading-7 text-secondary-500">
              Edit Account
            </button>
          </div>
        </div>

        <div className="col-span-4 border border-gray-100 rounded-sm">
          <div className="px-6 py-4">
            <h3 className=" text-label-3 uppercase">Account info</h3>
          </div>

          <Line />

          <div className="px-6 pb-6">
            <div className="flex items-center gap-4 pt-[22px] pb-6">
              <Image src={"/assets/images/avatar.png"} width={48} height={48} alt="My avatar" />

              <div>
                <h4 className="text-body-large-500">Kevin Gilbert</h4>
                <p className="text-body-small-400 text-gray-600">kevin.gilbert@gmail.com</p>
              </div>
            </div>

            <div className="gap-2">
              <div className="flex items-center gap-4 ">
                <h3 className="text-body-small-400">Email</h3>
                <p className="text-body-small-400 text-gray-600">kevin.gilbert@gmail.com</p>
              </div>

              <div className="flex items-center gap-4 ">
                <h3 className="text-body-small-400">Phone</h3>
                <p className="text-body-small-400 text-gray-600">+1-202-555-0118</p>
              </div>
            </div>

            <button className="h-12 px-6 mt-[22px] uppercase border-2 rounded-sm border-secondary-500 text-heading-7 text-secondary-500">
              Edit Account
            </button>
          </div>
        </div>

        <div className="col-span-4 space-y-6">
          <div className="w-full h-22 flex items-center gap-4 rounded-sm p-4 bg-secondary-50 ">
            <div className="p-3 bg-white rounded-xs">
              <Rock />
            </div>

            <div className="gap-1">
              <h3 className="text-body-xl-600">{user?.orderSummary?.totalOrders}</h3>
              <p className="text-body-small-400 text-gray-600">Pending Orders</p>
            </div>
          </div>

          <div className="w-full h-22 flex items-center gap-4 rounded-sm p-4 bg-secondary-50 ">
            <div className="p-3 bg-white rounded-xs">
              <Rock />
            </div>

            <div className="gap-1">
              <h3 className="text-body-xl-600">{user?.orderSummary?.completedOrders}</h3>
              <p className="text-body-small-400 text-gray-600">Total orders</p>
            </div>
          </div>

          <div className="w-full h-22 flex items-center gap-4 rounded-sm p-4 bg-success-50 ">
            <div className="p-3 bg-white rounded-xs">
              <Rock />
            </div>

            <div className="gap-1">
              <h3 className="text-body-xl-600">{user?.orderSummary?.pendingOrders}</h3>
              <p className="text-body-small-400 text-gray-600">Completed Orders</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border flex-1 border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-label-3 px-6 py-4 uppercase">Recent Order</h3>
          <button className="text-body-small-600 text-primary-500">View All</button>
        </div>
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
            {orders?.map((item, index) => {
              return (
                <tr key={index} className="border-t border-gray-200">
                  <td className="px-6 py-4">{item?.id}</td>
                  <td
                    className={`px-6 py-4 text-right ${
                      item?.status === ORDER_STATUS.COMPLETED ? "text-success-500" : "text-primary-500"
                    }`}
                  >
                    {item?.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : ""}
                  </td>
                  <td className="px-6 py-4 text-right">{dayjs(item?.created_at).format("MMM DD, YYYY hh:mm A")}</td>
                  <td className="px-6 py-4 text-right">{item?.totalAmount}</td>
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
  );
}
