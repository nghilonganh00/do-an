"use client";

import Editor from "@/src/components/common/Editor";
import CheckBox from "@/src/components/common/input/Checkbox";
import { useGetAllCategories } from "@/src/features/category/hooks/useGetAllCategories";
import VariantForm, { AddVariantForm, addVariantSchema } from "@/src/features/products/components/VariantForm";
import useCreateProduct from "@/src/features/products/hooks/useCreateProduct";
import { storage } from "@/src/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z, { file } from "zod";

const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  categoryId: z.number().min(1, "Category is required"),
  description: z.string(),
  variants: z.array(addVariantSchema).min(1, "At least one variant is required"),
});

type CreateProductForm = z.infer<typeof createProductSchema>;

const AddProductPage = () => {
  const router = useRouter();

  const { data: categories } = useGetAllCategories();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [variants, setVariants] = useState<AddVariantForm[]>([]);
  const createProductMutation = useCreateProduct();

  useEffect(() => {
    if (!files.length) return;

    Promise.all(files.map((f) => URL.createObjectURL(f))).then((urls) => setPreviews(urls));
  }, [files]);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProductSchema),
  });

  console.log("errors: ", errors);
  console.log("files: ", files);

  const uploadImages = useCallback(async (files: File[]) => {
    if (!files.length) return [];

    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;
        const fileRef = ref(storage, `uploads/${uniqueName}`);
        await uploadBytes(fileRef, file);
        return getDownloadURL(fileRef);
      })
    );

    return uploadedFiles;
  }, []);

  const onSubmit = async (values: CreateProductForm) => {
    console.log("values: ", values);
    const uploadedFiles = await uploadImages(files);
    console.log("uploadedFiles: ", uploadedFiles);
    createProductMutation.mutate({
      ...values,
      images: uploadedFiles,
      variants,
    });
  };

  const addVariant = (variant: AddVariantForm) => {
    const newVariants = [...variants, variant];
    setVariants((prev) => [...prev, variant]);
    setValue("variants", newVariants);
  };

  const removeVariant = (index: number) => {
    const newVariants = [...variants];
    newVariants.splice(index, 1);
    setVariants(newVariants);
    setValue("variants", newVariants);
  };

  return (
    <div className="px-10 py-6 ">
      <div className="flex items-center justify-between">
        <span className="text-body-xl-600">Add Product</span>
        <div className="flex items-center gap-3">
          <button className="h-10 px-6 border border-[#D7DBEC] bg-white text-[#1E5EFF] rounded-sm">Cancel</button>
          <button className="h-10 px-6 bg-[#1E5EFF] text-white rounded-sm" onClick={handleSubmit(onSubmit)}>
            Save
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-[30px] mt-[30px]">
        <div className="col-span-8 bg-white px-7 py-8 ">
          <span className="text-body-medium-600">Information</span>

          <form className="mt-6 space-y-6">
            <div>
              <label className="text-body-small-400">Product Name</label>
              <input {...register("name")} className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2" />
            </div>

            <div>
              <label className="text-body-small-400">Product Description</label>

              <Controller
                name="description"
                control={control}
                render={({ field }) => <Editor value={field.value} onChange={field.onChange} />}
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-gray-700">Images</span>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
                className="block w-full text-sm text-gray-700 
                   border border-gray-300 rounded-lg cursor-pointer bg-white 
                   focus:outline-none file:bg-gray-100 file:border-0 file:px-4 file:py-2 file:mr-3"
              />

              <div className="flex">
                {previews.map((src, i) => {
                  return <img key={i} src={src} className="w-24 h-24" />;
                })}
              </div>
            </div>
          </form>
        </div>

        <div className="col-span-4">
          <div className="bg-white p-7">
            <h5 className="text-body-medium-600">Categories</h5>
            <div className="space-y-3 mt-6">
              {categories?.map((category) => (
                <CheckBox
                  key={category.id}
                  title={category?.name || ""}
                  onChange={() => setValue("categoryId", category.id)}
                />
              ))}
            </div>
            <button className="mt-5 text-[#1E5EFF]" onClick={() => router.push("/admin/categories/add")}>
              Create New
            </button>
          </div>

          <div className="bg-white p-7">
            <h5 className="text-body-medium-600">Tags</h5>
            <label className="text-body-small-400">Add Tags</label>
            <input className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2" placeholder="Enter tag name" />

            <div className="flex flex-wrap gap-2 mt-5">
              <button className="flex items-center gap-3 bg-[#E6E9F4] px-3 py-1 rounded-sm">
                <span className="text-[#5A607F]">T-Shirt</span>
                <X size={16} color="#5A607F" strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm  mt-8 overflow-hidden">
        <div className="p-6 flex items-center justify-between border-b border-gray-100">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Phiên bản sản phẩm</h3>
            <p className="text-sm text-gray-500 mt-1">Quản lý các biến thể như màu sắc, kích thước...</p>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6 mb-8">
            <div className="p-4 border border-blue-100 bg-blue-50/50 rounded-lg animate-fade-in">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Mới</span>
              </div>
              <VariantForm onAddVariant={addVariant} />
            </div>
          </div>

          {variants.length > 0 ? (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tên phiên bản
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Giá bán
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Giá gốc
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tồn kho
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {variants.map((v, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{v.variantName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">{v.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{v.originalPrice}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${Number(v.stock) > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                          {v.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-red-600 hover:text-red-900 ml-3">Xóa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Empty State khi chưa có variant */
            variants.length === 0 && (
              <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500">Chưa có phiên bản nào được thêm.</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
