"use client";

import Dropdown, { DropdownItem } from "@/src/components/common/input/Dropdown";
import { useGetAllDistrictsByProvince } from "@/src/features/address/hooks/useGetAllDistrictsByProvince";
import { useGetAllProvinces } from "@/src/features/address/hooks/useGetAllProvinces";
import { useGetAllWardsByDistrict } from "@/src/features/address/hooks/useGetAllWardsByDistrict";
import { useGetMe } from "@/src/features/user/hooks/useGetMe";
import { updateUserProfileSchema } from "@/src/features/user/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

export default function SettingPage() {
  const { data: user } = useGetMe();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      name: user?.name,
      phone: user?.phone,
      address: user?.address,
      avatar: user?.avatar,
      provinceId: user?.provinceId,
      districtId: user?.districtId,
      wardId: user?.wardId,
    },
  });

  const watchedProvinceId = watch("provinceId");
  const watchedDistrictId = watch("districtId");

  // 2. CÁC HOOK LẤY DỮ LIỆU ĐÃ ĐƯỢC CẬP NHẬT
  // Thay vì dùng user?.provinceId, dùng giá trị được watch/reset trong form.
  const { data: provinces } = useGetAllProvinces();
  // Dùng watchedProvinceId (giá trị hiện tại trong form)
  const { data: districts } = useGetAllDistrictsByProvince(watchedProvinceId ?? null);
  // Dùng watchedDistrictId (giá trị hiện tại trong form)
  const { data: wards } = useGetAllWardsByDistrict(watchedDistrictId ?? null);

  // 3. LOGIC XỬ LÝ KHI DỮ LIỆU USER HOẶC TỈNH/HUYỆN THAY ĐỔI
  useEffect(() => {
    // A. Gán lại giá trị mặc định khi dữ liệu user có (chỉ chạy khi component mount hoặc user object thay đổi)
    if (user) {
      reset({
        name: user.name,
        phone: user.phone,
        address: user.address,
        avatar: user.avatar,
        provinceId: user.provinceId,
        districtId: user.districtId,
        wardId: user.wardId,
      });
    }
  }, [user, reset]);

  useEffect(() => {
    if (watchedProvinceId && watchedProvinceId !== user?.provinceId) {
      setValue("districtId", null); // Reset Huyện
      setValue("wardId", null); // Reset Xã
    }
  }, [watchedProvinceId, setValue, user?.provinceId]);

  useEffect(() => {
    if (watchedDistrictId && watchedDistrictId !== user?.districtId) {
      setValue("wardId", null); // Reset Xã
    }
  }, [watchedDistrictId, setValue, user?.districtId]);

  const provinceOptions = useMemo(
    () => provinces?.map((p) => ({ label: p.ProvinceName, value: p.ProvinceID.toString() })) ?? [],
    [provinces]
  );
  const districtOptions = useMemo(
    () => districts?.map((d) => ({ label: d.DistrictName, value: d.DistrictID.toString() })) ?? [],
    [districts]
  );
  const wardOptions = useMemo(
    () => wards?.map((w) => ({ label: w.WardName, value: w.WardCode.toString() })) ?? [],
    [wards]
  );

  // Lấy giá trị hiện tại TỪ FORM STATE (dùng watch thay vì getValues)
  const currentProvinceValue = watch("provinceId");
  const currentDistrictValue = watch("districtId");
  const currentWardValue = watch("wardId");

  const provinceValue = provinceOptions.find((option) => option.value === currentProvinceValue?.toString());
  const districtValue = districtOptions.find((option) => option.value === currentDistrictValue?.toString());
  const wardValue = wardOptions.find((option) => option.value === currentWardValue?.toString());

  return (
    <div className="w-full border border-gray-100 rounded-sm">
      <div className="px-6 py-4">
        <h3 className="text-label-3 uppercase">Cài đặt tài khoản</h3>
      </div>

      <div className="p-6">
        <div className="flex gap-6">
          {/* <img src={user?.avatar ?? ""} style={{ alignSelf: "flex-start" }} width={176} height={176} alt="avatar" /> */}

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
                <input
                  value={user?.name ?? ""}
                  className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2"
                  onChange={() => {}}
                />
              </div>

              <div className="col-span-6">
                <label className="text-body-small-400">Email</label>
                <input
                  value={user?.email ?? ""}
                  className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2"
                  readOnly
                  onChange={() => {}}
                />
              </div>

              <div className="col-span-6">
                <label className="text-body-small-400">Số điện thoại</label>
                <input
                  value={user?.phone ?? ""}
                  className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2"
                  onChange={() => {}}
                />
              </div>

              <div className="col-span-12">
                <label className="text-body-small-400">Địa chỉ</label>
                <input
                  value={user?.address ?? ""}
                  className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2"
                  onChange={() => {}}
                />
              </div>

              <div className="col-span-4">
                <label className="text-body-small-400">Xã, Phường, Trị trấn</label>
                <Dropdown
                  options={wardOptions}
                  value={wardValue}
                  onChange={(ward: DropdownItem) => {
                    setValue("wardId", Number(ward.value));
                  }}
                />
              </div>

              <div className="col-span-4">
                <label className="text-body-small-400">Huyện, Quận</label>
                <Dropdown
                  options={districtOptions}
                  value={districtValue}
                  onChange={(district: DropdownItem) => {
                    setValue("districtId", Number(district.value));
                  }}
                />
              </div>

              <div className="col-span-4">
                <label className="text-body-small-400">Tỉnh, Thành Phố</label>
                <Dropdown
                  options={provinceOptions}
                  value={provinceValue}
                  onChange={(province: DropdownItem) => {
                    setValue("provinceId", Number(province.value));
                  }}
                />
              </div>

              <div className="col-span-12">
                <label className="text-body-small-400">Mã bưu điện</label>
                <input
                  value={user?.zipCode ?? ""}
                  className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2"
                  onChange={() => {}}
                />
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
