"use client";

import { Star } from "../../icons";
import { useRouter } from "next/navigation";
import { Product, ProductVariant } from "@/src/types/product";

export default function ProductCard({
  productVariant,
  className,
}: {
  productVariant: ProductVariant;
  className?: string;
}) {
  const router = useRouter();

  return (
    <button
      className={`h-[320px] button p-4 border border-gray-100 rounded-[3px] ${className}`}
      onClick={() => router.push("product/" + productVariant?.productId)}
    >
      <img
        src={productVariant?.thumbnail || "/assets/images/mobile-1.png"}
        alt="Mobile 1"
        style={{ height: "full", margin: "0 auto", objectFit: "cover" }}
        className="rounded-md"
      />
      <div className="flex gap-1 items-center mt-6">
        <div className="flex gap-[1.5px]">
          <Star width={16} height={16} />
          <Star width={16} height={16} />
          <Star width={16} height={16} />
          <Star width={16} height={16} />
          <Star width={16} height={16} />
        </div>
        <span className="text-body-tiny-400 text-gray-500">(stars)</span>
      </div>
      <span className="text-left line-clamp-2 mt-2">{productVariant.product?.name || ""}</span>
      <span className="text-left text-body-small-400 text-secondary-500">${productVariant?.price || 0}</span>
    </button>
  );
}
