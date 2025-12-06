import { supabase } from "@/src/lib/supabaseClient";
import { Product } from "@/src/types/product";
import { VariantFormData } from "../components/VariantForm";

export const updateProductVariant = async (variant: VariantFormData): Promise<Product | null> => {
  if (!variant.id) {
    console.error("Variant ID is required");
    return null;
  }

  const { data, error } = await supabase
    .from("productVariants")
    .update({
      variantName: variant?.variantName || "",
      price: variant?.price || 0,
      originalPrice: variant?.originalPrice || 0,
      stock: variant?.stock || 0,
      thumbnail: variant?.thumbnail || "",
    })
    .eq("id", variant.id)
    .single();

  if (error) {
    console.error("Failed to create product:", error);
    return null;
  }

  return data;
};
