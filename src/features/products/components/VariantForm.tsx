import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

// 1. Cập nhật Schema: Thêm thumbnail validation
export const addVariantSchema = z.object({
  variantName: z.string().min(1, "Tên phiên bản là bắt buộc"),
  price: z.coerce.number().min(0, "Giá không hợp lệ"),
  originalPrice: z.coerce.number().min(0, "Giá gốc không hợp lệ"),
  stock: z.coerce.number().min(0, "Tồn kho không hợp lệ"),
  // Thumbnail có thể là FileList (khi upload) hoặc string (nếu edit)
  thumbnail: z.any().optional(),
});

export type AddVariantForm = z.infer<typeof addVariantSchema>;

const VariantForm = ({ onAddVariant }: { onAddVariant: (variant: AddVariantForm) => void }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<AddVariantForm>({
    resolver: zodResolver(addVariantSchema),
    defaultValues: {
      variantName: "",
      price: 0,
      originalPrice: 0,
      stock: 0,
    },
  });

  const thumbnailFile = watch("thumbnail");

  useEffect(() => {
    if (thumbnailFile && thumbnailFile.length > 0) {
      const file = thumbnailFile[0];
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [thumbnailFile]);

  const onSubmit = (values: AddVariantForm) => {
    onAddVariant({
      ...values,
      price: Number(values.price),
      originalPrice: Number(values.originalPrice),
      stock: Number(values.stock),
      thumbnail: values.thumbnail?.[0] ? values.thumbnail[0] : null,
    });

    reset();
    setPreview(null);
  };

  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col md:flex-row gap-5 items-start">
        <div className="w-full md:w-24 shrink-0">
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Ảnh</label>
          <div className="relative w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-colors flex flex-col justify-center items-center cursor-pointer overflow-hidden group">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              {...register("thumbnail")}
            />

            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-gray-400 flex flex-col items-center">
                <svg
                  className="w-6 h-6 mb-1 group-hover:text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <span className="text-[10px] uppercase font-bold group-hover:text-blue-500">Upload</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Tên phiên bản <span className="text-red-500">*</span>
            </label>
            <input
              {...register("variantName")}
              placeholder="Ví dụ: Đỏ / Size L"
              className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${errors.variantName ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"}`}
            />
            {errors.variantName && <p className="text-red-500 text-[10px] mt-1">{errors.variantName.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Tồn kho</label>
            <div className="relative">
              <input
                type="number"
                {...register("stock")}
                className="w-full border border-gray-300 rounded-md pl-3 pr-2 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              />
            </div>
            {errors.stock && <p className="text-red-500 text-[10px] mt-1">{errors.stock.message}</p>}
          </div>

          <div className="hidden md:block"></div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">Giá bán</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
              <input
                type="number"
                {...register("price")}
                className="w-full border border-gray-300 rounded-md pl-6 pr-3 py-2 text-sm font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              />
            </div>
            {errors.price && <p className="text-red-500 text-[10px] mt-1">{errors.price.message}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">Giá gốc</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
              <input
                type="number"
                {...register("originalPrice")}
                className="w-full border border-gray-300 rounded-md pl-6 pr-3 py-2 text-sm text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex items-end justify-end h-full mt-auto md:pb-1">
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-5 py-2.5 rounded-md text-sm font-medium shadow-sm transition-colors w-full md:w-auto justify-center"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(VariantForm);
