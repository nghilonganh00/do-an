"use client";

import Editor from "@/src/components/common/Editor/Editor";
import CheckBox from "@/src/components/common/input/Checkbox";
import { useGetAllCategories } from "@/src/features/category/hooks/useGetAllCategories";
import VariantArea from "@/src/features/products/components/VariantArea";
import { VariantFormData } from "@/src/features/products/components/VariantForm";
import useAddProductVariant from "@/src/features/products/hooks/useAddProductVariant";
import useCreateProduct from "@/src/features/products/hooks/useCreateProduct";
import { useGetProductById } from "@/src/features/products/hooks/useGetProductById";
import useUpdateProductVariant from "@/src/features/products/hooks/useUpdateProductVariant";
import { uploadImagesToFirebase } from "@/src/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2, X } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const editProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  categoryId: z.number().min(1, "Category is required"),
  description: z.string(),
  variants: z.array(z.any()).min(1, "At least one variant is required"),
});

type CreateProductForm = z.infer<typeof editProductSchema>;

const EditProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: categories } = useGetAllCategories();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [variants, setVariants] = useState<VariantFormData[]>([]);
  const createProductMutation = useCreateProduct();
  const { data: product } = useGetProductById(id);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateProductForm>({
    resolver: zodResolver(editProductSchema),
  });

  const { mutate: addProductVariant } = useAddProductVariant();
  const { mutate: updateProductVariant } = useUpdateProductVariant();

  useEffect(() => {
    if (!product) return;

    setValue("name", product?.name || "");
    setValue("categoryId", product?.categoryId || 1);
    setValue("description", product?.description || "");
    if (product?.variants) {
      setVariants(product.variants as VariantFormData[]);
    }
    setPreviews(product?.images || []);
  }, [product, setValue]);

  console.log("errors: ", errors);

  const onSubmit = async (values: CreateProductForm) => {
    console.log("values: ", values);
    const uploadedFiles = await uploadImagesToFirebase(files);

    createProductMutation.mutate({
      ...values,
      images: [...(product?.images || []), ...uploadedFiles],
      variants,
    });
  };

  const handleSubmitVariant = async (editingIndex: number | null, variantData: VariantFormData) => {
    if (editingIndex !== null) {
      // Logic CẬP NHẬT (Edit)
      console.log("editingIndex: ", variantData.thumbnail);
      const imageUrls = await uploadImagesToFirebase([variantData.thumbnail]);
      console.log("imageUrls: ", files);
      updateProductVariant({
        ...variantData,
        thumbnail: imageUrls.length > 0 ? imageUrls[0] : variantData.thumbnail,
      });
      const updatedVariants = [...variants];
      updatedVariants[editingIndex] = variantData;
      setVariants(updatedVariants);
    } else {
      // Logic THÊM MỚI (Add)
      setVariants((prev) => [...prev, variantData]);
      const imageUrls = await uploadImagesToFirebase([variantData.thumbnail]);
      addProductVariant({
        ...variantData,
        productId: Number(id),
        thumbnail: imageUrls.length > 0 ? imageUrls[0] : variantData.thumbnail,
      });
    }
  };

  const handleDeleteVariant = useCallback(
    (variantIndex: number) => {
      const newVariants = variants.filter((_, i) => i !== variantIndex);
      setVariants(newVariants);
    },
    [variants]
  );

  return (
    <div className="px-10 py-6 ">
      <div className="flex items-center justify-between">
        <span className="text-body-xl-600">Chỉnh sửa sản phẩm</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 h-10 px-4 bg-red-100 text-red-600 border border-red-200 rounded-sm hover:bg-red-200 transition-colors"
            // onClick={handleDeleteProduct}
            // disabled={deleteProductMutation.isPending}
          >
            {false ? (
              "Deleting..."
            ) : (
              <>
                <Trash2 size={18} />
                <span>Delete</span>
              </>
            )}
          </button>
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
                  return <Image key={i} src={src} className="w-24 h-24" width={96} height={96} alt="" />;
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

      <VariantArea variants={variants} onSubmit={handleSubmitVariant} onDelete={handleDeleteVariant} />
    </div>
  );
};

export default EditProductPage;
