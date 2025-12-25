"use client";

import Editor from "@/src/components/common/Editor/Editor";
import { useGetAllCategories } from "@/src/features/category/hooks/useGetAllCategories";
import VariantArea from "@/src/features/products/components/VariantArea";
import { VariantFormData } from "@/src/features/products/components/VariantForm";
import useCreateProduct from "@/src/features/products/hooks/useCreateProduct";
import { uploadImagesToFirebase } from "@/src/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import z from "zod";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function for classes
function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

// 1. Dịch thông báo validate
const createProductSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên sản phẩm"),
  categoryId: z.number().min(1, "Vui lòng chọn danh mục"),
  description: z.string().optional(),
  variants: z.array(z.object({})).optional(),
  meta_description: z.string().optional(),
});

type CreateProductForm = z.infer<typeof createProductSchema>;

const AddProductPage = () => {
  const router = useRouter();

  const { data: categories } = useGetAllCategories();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [variants, setVariants] = useState<VariantFormData[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createProductMutation = useCreateProduct();

  useEffect(() => {
    if (!files.length) {
      setPreviews([]);
      return;
    }
    const objectUrls = files.map((f) => URL.createObjectURL(f));
    setPreviews(objectUrls);

    return () => objectUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateProductForm>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      description: "",
      meta_description: "",
    },
  });

  const selectedCategoryId = watch("categoryId");

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (values: CreateProductForm) => {
    try {
      setIsSubmitting(true);

      // 1. Upload Product Images
      let uploadedFiles: string[] = [];
      if (files.length > 0) {
        uploadedFiles = await uploadImagesToFirebase(files);
      }

      // 2. Upload Variant Images
      const variantsWithThumbnailURL = await Promise.all(
        variants.map(async (variant) => {
          if (variant.thumbnail instanceof File) {
            const thumbnailURLs = await uploadImagesToFirebase([variant.thumbnail]);
            return {
              ...variant,
              thumbnail: thumbnailURLs[0],
            };
          }
          return variant;
        })
      );

      // 3. Create Product
      await createProductMutation.mutateAsync({
        ...values,
        images: uploadedFiles,
        variants: variantsWithThumbnailURL,
      });

      // 2. Dịch thông báo Toast
      toast.success("Tạo sản phẩm thành công!");
      router.push("/admin/products");
    } catch (error) {
      console.error(error);
      toast.error("Tạo sản phẩm thất bại. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitVariant = async (editingIndex: number | null, variantData: VariantFormData) => {
    if (editingIndex !== null) {
      const updatedVariants = [...variants];
      updatedVariants[editingIndex] = variantData;
      setVariants(updatedVariants);
    } else {
      setVariants((prev) => [...prev, variantData]);
    }
  };

  const handleDeleteVariant = useCallback((variantIndex: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== variantIndex));
  }, []);

  return (
    <div className="px-10 py-6 bg-[#F8F9FC] min-h-screen">
      <Toaster position="top-right" richColors />

      {/* --- HEADER --- */}
      <div className="flex items-center justify-between bg-[#F8F9FC]/90 backdrop-blur-sm py-4">
        <div>
          {/* 3. Dịch Tiêu đề trang */}
          <h1 className="text-2xl font-bold text-gray-800">Thêm sản phẩm</h1>
          <p className="text-sm text-gray-500">Tạo sản phẩm mới cùng với các biến thể.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => router.back()}
            className="h-10 px-6 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Hủy
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            className="h-10 px-6 bg-[#1E5EFF] text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {/* 4. Dịch trạng thái nút bấm */}
            {isSubmitting ? "Đang lưu..." : "Lưu sản phẩm"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 mt-6">
        {/* --- LEFT COLUMN: INFO --- */}
        <div className="col-span-8 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Thông tin chung</h2>

            <form className="space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên sản phẩm <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("name")}
                  placeholder="VD: Áo thun Oversized"
                  className={cn(
                    "w-full h-11 border rounded-lg px-4 outline-none transition-all focus:ring-2 focus:ring-blue-100",
                    errors.name ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-[#1E5EFF]"
                  )}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả sản phẩm</label>
                <div className="prose-sm">
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <Editor value={field.value || ""} onChange={field.onChange} />}
                  />
                </div>
              </div>

              {/* Images Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Thư viện ảnh</label>

                {/* Image Dropzone UI */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const newFiles = Array.from(e.target.files ?? []);
                      setFiles((prev) => [...prev, ...newFiles]);
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                    <UploadCloud className="w-6 h-6 text-[#1E5EFF]" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Nhấn hoặc kéo thả ảnh vào đây</p>
                  <p className="text-xs text-gray-400 mt-1">Hỗ trợ PNG, JPG tối đa 10MB</p>
                </div>

                {/* Image Previews */}
                {previews.length > 0 && (
                  <div className="grid grid-cols-5 gap-4 mt-4">
                    {previews.map((src, i) => (
                      <div
                        key={i}
                        className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 bg-white"
                      >
                        <Image src={src} fill alt="preview" className="object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(i)}
                          className="absolute top-1 right-1 p-1 bg-white/90 text-red-500 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Meta Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả Meta (cho AI/SEO)</label>
                <Controller
                  name="meta_description"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      rows={3}
                      className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-[#1E5EFF] focus:ring-2 focus:ring-blue-100 text-sm resize-none"
                      placeholder="Nhập chi tiết để hỗ trợ SEO hoặc AI..."
                    />
                  )}
                />
              </div>
            </form>
          </div>
        </div>

        {/* --- RIGHT COLUMN: CATEGORY --- */}
        <div className="col-span-4 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h5 className="text-lg font-semibold text-gray-800 mb-4">Danh mục</h5>

            {errors.categoryId && <p className="text-red-500 text-xs mb-2">{errors.categoryId.message}</p>}

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {categories?.map((category) => {
                const isSelected = selectedCategoryId === category.id;
                return (
                  <div
                    key={category.id}
                    onClick={() => setValue("categoryId", category.id)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                      isSelected ? "border-[#1E5EFF] bg-blue-50/50" : "border-transparent hover:bg-gray-50"
                    )}
                  >
                    <span className={cn("text-sm font-medium", isSelected ? "text-[#1E5EFF]" : "text-gray-700")}>
                      {category.name}
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              className="w-full mt-5 py-2.5 text-sm font-medium text-[#1E5EFF] bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-100"
              onClick={() => router.push("/admin/categories/add")}
            >
              + Tạo danh mục mới
            </button>
          </div>
        </div>
      </div>

      {/* --- VARIANT AREA (Giữ nguyên logic) --- */}
      <div className="mt-8">
        <VariantArea variants={variants} onSubmit={handleSubmitVariant} onDelete={handleDeleteVariant} />
      </div>
    </div>
  );
};

export default AddProductPage;
