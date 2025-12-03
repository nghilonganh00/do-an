import { zodResolver } from "@hookform/resolvers/zod";
import { memo } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export const addVariantSchema = z.object({
  variantName: z.string().min(1, "Name is required"),
  price: z.coerce.number().min(0),
  originalPrice: z.coerce.number().min(0),
  stock: z.coerce.number().min(0),
  // thumbnail: z.string(),
});

export type AddVariantForm = z.infer<typeof addVariantSchema>;

const VariantForm = ({ onAddVariant }: { onAddVariant: (variant: AddVariantForm) => void }) => {
  const { register, handleSubmit, reset } = useForm<AddVariantForm>({
    resolver: zodResolver(addVariantSchema),
    defaultValues: {
      variantName: "",
      price: 0,
      originalPrice: 0,
      stock: 0,
    },
  });

  const onSubmit = (values: AddVariantForm) => {
    console.log("values: ", values);
    onAddVariant({
      ...values,
      price: Number(values.price),
      originalPrice: Number(values.originalPrice),
      stock: Number(values.stock),
    });
    reset();
  };

  return (
    <div className="grid grid-cols-6 gap-3 items-end p-4 border rounded-md bg-gray-50">
      <div className="col-span-1">
        <label className="block text-xs mb-1">Name</label>
        <input {...register("variantName")} className="w-full border p-2 rounded text-sm" />
      </div>

      <div>
        <label className="block text-xs mb-1">Price</label>
        <input type="number" {...register("price")} className="w-full border p-2 rounded text-sm" />
      </div>

      <div>
        <label className="block text-xs mb-1">Original</label>
        <input type="number" {...register("originalPrice")} className="w-full border p-2 rounded text-sm" />
      </div>

      <div>
        <label className="block text-xs mb-1">Stock</label>
        <input type="number" {...register("stock")} className="w-full border p-2 rounded text-sm" />
      </div>

      {/* <div className="col-span-1">
        <label className="block text-xs mb-1">Thumbnail</label>
        <input {...register("thumbnail")} className="w-full border p-2 rounded text-sm" />
      </div> */}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded h-[38px] text-sm"
        onClick={handleSubmit(onSubmit)}
      >
        Add
      </button>
    </div>
  );
};

export default memo(VariantForm);
