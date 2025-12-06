import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export const addVariantSchema = z.object({
  id: z.number().optional(),
  productId: z.number().optional(),
  variantName: z.string().min(1, "Tên phiên bản là bắt buộc"),
  price: z.coerce.number().min(0, "Giá không hợp lệ"),
  originalPrice: z.coerce.number().min(0, "Giá gốc không hợp lệ"),
  stock: z.coerce.number().min(0, "Tồn kho không hợp lệ"),
  thumbnail: z.any().optional(),
});

export type VariantFormData = z.infer<typeof addVariantSchema>;

interface VariantFormDataProps {
  onSubmitVariant: (variant: VariantFormData) => void;
  editingVariant?: VariantFormData | null;
  onCancelEdit?: () => void;
}

const VariantFormData = ({ onSubmitVariant, editingVariant, onCancelEdit }: VariantFormDataProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addVariantSchema),
    defaultValues: {
      id: 0,
      variantName: "",
      price: 0,
      originalPrice: 0,
      stock: 0,
      thumbnail: "",
    },
  });

  const thumbnailFile = watch("thumbnail");

  useEffect(() => {
    if (editingVariant) {
      reset({
        id: editingVariant.id,
        variantName: editingVariant.variantName,
        price: editingVariant.price,
        originalPrice: editingVariant.originalPrice,
        stock: editingVariant.stock,
        thumbnail: editingVariant.thumbnail,
      });

      // Nếu thumbnail là string (URL ảnh cũ), set preview luôn
      if (typeof editingVariant.thumbnail === "string") {
        setPreview(editingVariant.thumbnail);
      } else if (editingVariant.thumbnail instanceof File) {
        setPreview(URL.createObjectURL(editingVariant.thumbnail));
      }
    } else {
      // Nếu không sửa (chế độ thêm mới), reset form
      reset({
        id: 0,
        variantName: "",
        price: 0,
        originalPrice: 0,
        stock: 0,
        thumbnail: "",
      });
      setPreview(null);
    }
  }, [editingVariant, reset]);

  // Effect 2: Xử lý preview khi người dùng chọn ảnh MỚI từ máy tính
  useEffect(() => {
    if (thumbnailFile && thumbnailFile.length > 0 && thumbnailFile instanceof FileList) {
      const file = thumbnailFile[0];
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    // Nếu thumbnail bị xóa hoặc null và không phải đang edit mode với ảnh cũ
    else if (!thumbnailFile && !editingVariant) {
      setPreview(null);
    }
  }, [thumbnailFile]);

  const onFormSubmit = (values: VariantFormData) => {
    onSubmitVariant({
      ...values,
      price: Number(values.price),
      originalPrice: Number(values.originalPrice),
      stock: Number(values.stock),
      // Logic lấy thumbnail: Nếu upload mới (FileList) lấy file đầu, nếu không giữ nguyên giá trị cũ (string/File)
      thumbnail:
        values.thumbnail instanceof FileList && values.thumbnail.length > 0 ? values.thumbnail[0] : values.thumbnail,
    });

    // Chỉ reset form nếu đang ở chế độ thêm mới.
    // Nếu đang sửa, việc reset sẽ do Parent Component xử lý (setEditingVariant về null)
    if (!editingVariant) {
      reset();
      setPreview(null);
    }
  };

  return (
    <div
      className={`p-5 rounded-lg border shadow-sm transition-all duration-200 ${editingVariant ? "bg-orange-50 border-orange-200" : "bg-white border-gray-200 hover:shadow-md"}`}
    >
      {/* Header nhỏ để biết đang Sửa hay Thêm */}
      {editingVariant && (
        <div className="mb-4 flex justify-between items-center border-b border-orange-200 pb-2">
          <span className="text-xs font-bold text-orange-600 uppercase">Đang chỉnh sửa</span>
          <button onClick={onCancelEdit} type="button" className="text-xs text-gray-500 hover:text-gray-800 underline">
            Hủy bỏ
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-5 items-start">
        {/* Phần Image Upload giữ nguyên logic hiển thị */}
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

        {/* Các input fields giữ nguyên */}
        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Tên phiên bản <span className="text-red-500">*</span>
            </label>
            <input
              {...register("variantName")}
              className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${errors.variantName ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"}`}
              placeholder="Ví dụ: Đỏ / Size L"
            />
            {errors.variantName && <p className="text-red-500 text-[10px] mt-1">{errors.variantName.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Tồn kho</label>
            <input
              type="number"
              {...register("stock")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
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

        {/* Buttons Action */}
        <div className="flex flex-col gap-2 items-end justify-end h-full mt-auto md:pb-1 min-w-[100px]">
          <button
            type="button"
            onClick={handleSubmit(onFormSubmit)}
            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium shadow-sm transition-colors w-full ${
              editingVariant
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {editingVariant ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Lưu
              </>
            ) : (
              <>
                <button className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                  Thêm
                </button>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(VariantFormData);
