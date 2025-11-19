"use client";

import { Line } from "@/src/components/common/Line";
import DashboardSidebar from "@/src/components/common/sidebar/DashboardSidebar";
import { Stack } from "@/src/components/icons/Stack";
import Header from "@/src/components/layout/Header";
import Image from "next/image";
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

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="flex-1">
      <h3 className="text-body-xl-600">Hello, Kevin</h3>
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

          <div className="flex items-center gap-4 pt-[22px] px-6 pb-6">
            <Image src={"/assets/images/avatar.png"} width={48} height={48} alt="My avatar" />
          </div>
        </div>
      </div>
    </div>
  );
}
