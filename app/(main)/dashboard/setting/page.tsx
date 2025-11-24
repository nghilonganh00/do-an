"use client";

import { useGetMe } from "@/src/features/user/hooks/useGetMe";
import Image from "next/image";

export default function SettingPage() {
  const { data: user } = useGetMe();

  return (
    <div className="w-full border border-gray-100 rounded-sm">
      <div className="px-6 py-4">
        <h3 className="text-label-3 uppercase">Cài đặt tài khoản</h3>
      </div>

      <div className="p-6">
        <div className="flex gap-6">
          <img src={user?.avatar ?? ""} style={{ alignSelf: "flex-start" }} width={176} height={176} alt="avatar" />

          <div className="flex-1">
            <div className="flex-1 grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <label className="text-body-small-400">Tên hiển thị</label>
                <input
                  value={user?.name ?? ""}
                  className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2"
                  readOnly
                />
              </div>

              <div className="col-span-6">
                <label className="text-body-small-400">Họ và tên</label>
                <input value={user?.name ?? ""} className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2" />
              </div>

              <div className="col-span-6">
                <label className="text-body-small-400">Email</label>
                <input
                  value={user?.email ?? ""}
                  className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2"
                  readOnly
                />
              </div>

              <div className="col-span-6">
                <label className="text-body-small-400">Số điện thoại</label>
                <input value={user?.phone ?? ""} className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2" />
              </div>

              <div className="col-span-12">
                <label className="text-body-small-400">Địa chỉ</label>
                <input value={user?.address ?? ""} className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2" />
              </div>

              <div className="col-span-4">
                <label className="text-body-small-400">Quốc gia</label>
                <input value={user?.country ?? ""} className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2" />
              </div>

              <div className="col-span-4">
                <label className="text-body-small-400">Tỉnh/Thành phố</label>
                <input value={user?.city ?? ""} className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2" />
              </div>

              <div className="col-span-4">
                <label className="text-body-small-400">Quận/Huyện</label>
                <input value={user?.state ?? ""} className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2" />
              </div>

              <div className="col-span-12">
                <label className="text-body-small-400">Mã bưu điện</label>
                <input value={user?.zipCode ?? ""} className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2" />
              </div>
            </div>

            <button className="h-12 flex items-center justify-center gap-2 px-6 mt-6 bg-primary-500 rounded-xs">
              <span className="text-heading-7 text-gray">LƯU THAY ĐỔI</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
