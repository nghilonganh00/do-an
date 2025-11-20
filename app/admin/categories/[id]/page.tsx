"use client";

import { useGetCategoryById } from "@/src/features/category/hooks/useGetCategoryById";
import { Edit, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryFormValues } from "@/src/features/category/types";
import { categorySchema } from "@/src/features/category/constants";
import { use, useCallback, useEffect } from "react";
import Head from "next/head";
import { useUpdateCategory } from "@/src/features/category/hooks/useUpdateCategory";

const CategoryDetailPage = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { data: category } = useGetCategoryById({ params: { categoryId: id } });
  const { mutateAsync: updateCategory, isSuccess: isUpdateSuccess } = useUpdateCategory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: category || { name: "", image: "" },
  });

  const onSubmit = useCallback(async (values: CategoryFormValues) => {
    await updateCategory({ categoryId: id, data: { name: values.name, image: values.image } });

    router.push("/admin/categories");
  }, []);

  useEffect(() => {
    if (category) {
      reset(category);
    }
  }, [category, reset]);

  return (
    <>
      <Head>
        <title>Chỉnh sửa Category</title>
      </Head>

      <div className="px-10 py-6 ">
        <div className="flex items-center justify-between">
          <span className="text-body-xl-600">{category?.name || 0}</span>

          <div className="flex items-center gap-3">
            <button
              className="h-10 px-6 border border-[#D7DBEC] bg-white text-[#1E5EFF] rounded-sm"
              onClick={() => router.push("/admin/categories")}
            >
              Cancel
            </button>
            <button className="h-10 px-6 bg-[#1E5EFF] text-white rounded-sm" onClick={handleSubmit(onSubmit)}>
              Save
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-[30px]">
          <div className="col-span-8 p-7 bg-white rounded-md">
            <div className="flex items-center justify-between">
              <div className="">
                Products <span>{category?.products?.length || 0}</span>
              </div>

              <button
                className="h-10 px-6 bg-[#1E5EFF] text-white rounded-sm"
                onClick={() => router.push("/admin/products/add")}
              >
                Add product
              </button>
            </div>

            <div className="mt-6 space-y-3">
              {category?.products?.map((item, idx) => (
                <div
                  key={idx}
                  className="group flex items-center p-4 border border-[#E6E9F4] rounded-sm justify-between"
                >
                  <div className="flex items-center">
                    <img src={item?.image} alt="Product Image" className="w-12 h-12 mr-3 rounded" />
                    <span className="text-gray-800">{item?.name}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity text-sm  text-gray-600 px-1 py-1 rounded">
                      <Edit size={14} />
                    </button>

                    <button className="opacity-0 group-hover:opacity-100 transition-opacity text-sm  text-gray-600 px-1 py-1 rounded">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-4 p-7 mt-7 bg-white">
            <div>Category Info</div>

            <div className="mt-6">
              <label className="text-body-small-400">Category Name</label>
              <input {...register("name")} className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2" />
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <span className="text-sm font-medium text-gray-700">Images</span>

              <input
                type="file"
                accept="image/*"
                {...register("image")}
                className="block w-full text-sm text-gray-700 
                     border border-gray-300 rounded-lg cursor-pointer bg-white 
                     focus:outline-none file:bg-gray-100 file:border-0 file:px-4 file:py-2 file:mr-3"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryDetailPage;
