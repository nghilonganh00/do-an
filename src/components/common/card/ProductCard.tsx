"use client";

import { Star } from "../../icons";
import { useRouter } from "next/navigation";
import { Product } from "@/src/types/product";
import Image from "next/image";
import { formatPriceVN } from "@/src/utils/formatPriceVN";

export default function ProductCard({ product, className }: { product: Product; className?: string }) {
  const router = useRouter();

  console.log("product: ", product);

  return (
    <button
      className={`h-[320px] button p-4 border border-gray-100 rounded-[3px] ${className}`}
      onClick={() => router.push("product/" + product?.id)}
    >
      <Image
        src={product?.images?.[0] || "/assets/images/mobile-1.png"}
        alt="Mobile 1"
        width={200}
        height={200}
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
      <h3 className="text-body-small-400 text-left line-clamp-2 mt-2">{product?.name || ""}</h3>
      <p className="text-left text-body-small-400 text-secondary-500">
        {formatPriceVN(product?.variants?.[0]?.price || 0)}
      </p>
    </button>
  );
}
