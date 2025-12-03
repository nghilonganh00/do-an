"use client";

import CheckBox from "@/src/components/common/input/Checkbox";
import { useGetAllCategories } from "@/src/features/category/hooks/useGetAllCategories";
import VariantForm, { AddVariantForm, addVariantSchema } from "@/src/features/products/components/VariantForm";
import useCreateProduct from "@/src/features/products/hooks/useCreateProduct";
import { useGetProductById } from "@/src/features/products/hooks/useGetProductById";
import { ProductVariant } from "@/src/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const editProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  categoryId: z.number().min(1, "Category is required"),
  description: z.string(),
  variants: z.array(ProductVariant).min(1, "At least one variant is required"),
});

type CreateProductForm = z.infer<typeof editProductSchema>;

const EditProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: categories } = useGetAllCategories();
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [variantForms, setVariantForms] = useState<number[]>([]);
  const createProductMutation = useCreateProduct();
  const { data: product } = useGetProductById(id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateProductForm>({
    resolver: zodResolver(editProductSchema),
  });

  useEffect(() => {
    if (product) {
      setValue("name", product?.name || "");
      setValue("categoryId", product?.categoryId || 1);
      setValue("description", product?.description || "");
      setVariants(product.variants);
    }
  }, [product]);

  console.log("errors: ", errors);

  const onSubmit = (values: CreateProductForm) => {
    console.log("add values: ", values);
    createProductMutation.mutate(
      {
        ...values,
        variants,
      }
      // { onSuccess: () => router.push("/admin/products") }
    );
  };

  const addVariant = (variant: AddVariantForm) => {
    const newVariants = [...variants, variant];
    setVariants((prev) => [...prev, variant]);
    setValue("variants", newVariants);
  };

  const addVariantForm = () => {
    setVariantForms((prev) => [...prev, Date.now()]);
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
              <input {...register("description")} className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2" />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-gray-700">Images</span>

              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-700 
                   border border-gray-300 rounded-lg cursor-pointer bg-white 
                   focus:outline-none file:bg-gray-100 file:border-0 file:px-4 file:py-2 file:mr-3"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-body-medium-600">Variants</span>

                <button type="button" onClick={addVariantForm} className="bg-blue-600 text-white px-4 py-2 rounded">
                  Add Variant
                </button>
              </div>

              {/* Render các VariantForm */}
              <div className="space-y-4">
                {variantForms.map((id) => (
                  <VariantForm key={id} onAddVariant={addVariant} />
                ))}
              </div>

              {/* Danh sách variants đã submit */}
              <div className="mt-4 space-y-2">
                {variants.length > 0 && <h5 className="font-semibold">Added Variants:</h5>}

                {variants.map((v, i) => (
                  <div key={i} className="border p-3 rounded bg-gray-100">
                    <div className="font-medium">{v.variantName}</div>
                    <div className="text-sm text-gray-600">
                      Price: {v.price} – Origin: {v.originalPrice} – Stock: {v.stock}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h5>Price</h5>

              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <label className="text-body-small-400">Product Price</label>
                  <input className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2" />
                </div>

                <div className="flex-1">
                  <label className="text-body-small-400">Discount Price</label>
                  <input className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2" />
                </div>
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
    </div>
  );
};

export default EditProductPage;
