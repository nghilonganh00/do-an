import { supabase } from "@/src/lib/supabaseClient";
import { Product } from "@/src/types/product";
import { CreateProduct } from "../types";

export const createProduct = async (product: CreateProduct): Promise<Product | null> => {
  const { data, error } = await supabase
    .from("products")
    .insert({
      name: product.name,
      description: product.description,
      categoryId: product.categoryId,
    })
    .select("*")
    .single();

  const { data: productVariants, error: productVariantsError } = await supabase.from("productVariants").upsert(
    product.variants.map((variant) => ({
      ...variant,
      sku: Math.floor(Math.random() * 1_000_000).toString(),
      productId: data?.id,
    })),
    { onConflict: "id" }
  );

  if (error) {
    console.error("Failed to create product:", error);
    return null;
  }

  return data;
};
