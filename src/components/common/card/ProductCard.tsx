"use client";

import Image from "next/image";
import { Star } from "../../icons";
import { useRouter } from "next/navigation";

type Product = {
  name?: string;
  image: string;
  stars?: number;
  price?: number;
};

export default function ProductCard({ name, image, stars, price }: Product) {
  const router = useRouter();
  console.log("image: ", image);

  return (
    <div
      className="col-span-3 button p-4 border border-gray-100 rounded-[3px]"
      onClick={() => router.push("product/1")}
    >
      <img
        src={image || "/assets/images/mobile-1.png"}
        alt="Mobile 1"
        style={{ width: "202px", height: "172px", objectFit: "cover" }}
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
      <span className="line-clamp-2 mt-2">{name}</span>
      <span className="text-body-small-400 text-secondary-500">${price}</span>
    </div>
  );
}
