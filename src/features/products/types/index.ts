import { Product, ProductVariant } from "@/src/types/product";

export type CreateProduct = Omit<Product, "id" | "variants"> & { variants: AddVariant[] };

export type AddVariant = Omit<ProductVariant, "id">;
