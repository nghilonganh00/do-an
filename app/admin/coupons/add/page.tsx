"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { Percent, Tag } from "lucide-react";
import { useState } from "react";
import { useCreateCoupon } from "@/src/features/coupon/hooks/useCreateCoupon";
import { DISCOUNT_TYPE } from "@/src/constants";

const createCouponSchema = z
  .object({
    code: z.string().min(1, "Mã giảm giá là bắt buộc"),
    discountType: z.string().min(1, "Vui lòng chọn loại giảm giá"),
    discountValue: z.number().min(1, "Giá trị giảm là bắt buộc"),
    usageLimit: z.number().min(1, "Số lượt sử dụng là bắt buộc"),
    validFrom: z.string().min(1, "Ngày bắt đầu là bắt buộc"),
    validTo: z.string().min(1, "Ngày kết thúc là bắt buộc"),
    description: z.string().optional(),
  })
  .refine((data) => new Date(data.validFrom) < new Date(data.validTo), {
    message: "Ngày kết thúc phải sau ngày bắt đầu",
    path: ["validTo"],
  });

type CreateCouponSchema = z.infer<typeof createCouponSchema>;

const AddCouponPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorApi, setErrorApi] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateCouponSchema>({
    resolver: zodResolver(createCouponSchema),
  });

  const selectedType = watch("discountType");

  const { mutateAsync: createCoupon } = useCreateCoupon();

  const onSubmit = async (values: CreateCouponSchema) => {
    try {
      setLoading(true);
      setErrorApi("");

      const response = await createCoupon({
        code: values.code,
        discountType: values.discountType as DISCOUNT_TYPE,
        discountValue:
          values.discountType === DISCOUNT_TYPE.PERCENT ? values.discountValue / 100 : values.discountValue,
        usageLimit: values.usageLimit,
        validFrom: values.validFrom,
        validTo: values.validTo,
        description: values.description,
      });

      if (!response) {
        setErrorApi("Có lỗi xảy ra");
        setLoading(false);
        return;
      }

      router.push("/admin/coupons");
    } catch (e) {
      setErrorApi("Không thể kết nối tới máy chủ");
    } finally {
      setLoading(false);
    }
  };

  const typeCard = (type: string, icon: any, title: string, desc: string) => (
    <div
      className={`flex items-center gap-3 border p-4 rounded-md cursor-pointer transition-all 
      ${selectedType === type ? "border-blue-500 shadow-md bg-blue-50" : "border-gray-200 hover:shadow"}`}
      onClick={() => setValue("discountType", type)}
    >
      <div className="w-12 h-12 flex items-center justify-center">{icon}</div>
      <div>
        <p className="font-medium">{title}</p>
        <span className="text-sm text-gray-600">{desc}</span>
      </div>
    </div>
  );

  return (
    <div className="px-10 py-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <span className="text-body-xl-600">Tạo mã giảm giá</span>
        <div className="flex items-center gap-3">
          <button
            className="h-10 px-6 border border-[#D7DBEC] bg-white text-[#1E5EFF] rounded-sm hover:bg-gray-50"
            onClick={() => router.back()}
          >
            Hủy
          </button>
          <button
            className="h-10 px-6 bg-[#1E5EFF] text-white rounded-sm hover:bg-blue-600 disabled:opacity-50"
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
          >
            {loading ? "Đang lưu..." : "Lưu lại"}
          </button>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="bg-white p-7 mt-7.5 rounded-md">
        {errorApi && <p className="text-red-600 mb-4 font-medium">{errorApi}</p>}

        <form className="space-y-8">
          {/* SECTION TITLE */}
          <div>
            <h4 className="text-lg font-semibold">Thông tin mã giảm giá</h4>
            <span className="text-sm text-gray-600">Người dùng sẽ nhập mã này khi thanh toán</span>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* CODE */}
            <div>
              <label className="text-body-small-400">Mã giảm giá</label>
              <input {...register("code")} className="w-full h-11 mt-2 border border-gray-200 rounded-sm p-2 " />
              <p className="text-red-500 text-sm">{errors.code?.message}</p>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="text-body-small-400">Mô tả</label>
              <input {...register("description")} className="w-full h-11 mt-2 border border-gray-200 rounded-sm p-2 " />
            </div>

            {/* TYPE SELECTOR */}
            <div className="col-span-2">
              <h4 className="font-medium mb-2">Loại giảm giá</h4>
              <span className="text-sm text-gray-600">Chọn kiểu giảm giá</span>

              <div className="flex items-center gap-6 mt-4">
                {typeCard(
                  "percent",
                  <Percent className="text-blue-600" />,
                  "Giảm theo phần trăm",
                  "Giảm giá theo % tổng tiền"
                )}

                {typeCard("fixed", <Tag className="text-gray-700" />, "Giảm cố định", "Giảm một số tiền cố định")}
              </div>
              <p className="text-red-500 text-sm">{errors.discountType?.message}</p>
            </div>

            {/* DISCOUNT VALUE */}
            <div>
              <label className="text-body-small-400">Giá trị giảm</label>
              <input
                {...register("discountValue", { valueAsNumber: true })}
                className="w-full h-11 mt-2 border border-gray-200 rounded-sm p-2"
                placeholder={selectedType === "percent" ? "Ví dụ: 10 (%)" : "Ví dụ: 50000 (VNĐ)"}
              />
              <p className="text-red-500 text-sm">{errors.discountValue?.message}</p>
            </div>

            {/* USAGE LIMIT */}
            <div>
              <label className="text-body-small-400">Số lượt sử dụng</label>
              <input
                {...register("usageLimit", { valueAsNumber: true })}
                className="w-full h-11 mt-2 border border-gray-200 rounded-sm p-2"
              />
              <p className="text-red-500 text-sm">{errors.usageLimit?.message}</p>
            </div>

            {/* FROM DATE */}
            <div>
              <label className="text-body-small-400">Ngày bắt đầu</label>
              <input
                {...register("validFrom")}
                type="datetime-local"
                className="w-full h-11 mt-2 border border-gray-200 rounded-sm p-2"
              />
              <p className="text-red-500 text-sm">{errors.validFrom?.message}</p>
            </div>

            {/* TO DATE */}
            <div>
              <label className="text-body-small-400">Ngày kết thúc</label>
              <input
                {...register("validTo")}
                type="datetime-local"
                className="w-full h-11 mt-2 border border-gray-200 rounded-sm p-2"
              />
              <p className="text-red-500 text-sm">{errors.validTo?.message}</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCouponPage;
