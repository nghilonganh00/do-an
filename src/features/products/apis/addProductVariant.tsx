import { supabase } from "@/src/lib/supabaseClient";
import { Product } from "@/src/types/product";
import { VariantFormData } from "../components/VariantForm";

export const addProductVariant = async (variant: VariantFormData): Promise<Product | null> => {
  if (!variant.productId) {
    console.error("Product ID is required");
    return null;
  }

  const { data, error } = await supabase
    .from("productVariants")
    .insert({
      variantName: variant?.variantName || "",
      price: variant?.price || 0,
      originalPrice: variant?.originalPrice || 0,
      stock: variant?.stock || 0,
      thumbnail: variant?.thumbnail || "",
      productId: variant?.productId,
      sku: Math.floor(Math.random() * 1_000_000).toString(),
    })
    .eq("id", variant.id)
    .single();

  if (error) {
    console.error("Failed to create product:", error);
    return null;
  }

  return data;
};
