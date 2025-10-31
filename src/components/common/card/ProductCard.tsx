import Image from "next/image";
import { Star } from "../../icons";

type Product = {
  name?: string;
  image: string;
  stars?: number;
  price?: number;
};

export default function ProductCard({ name, image, stars, price }: Product) {
  return (
    <div className="col-span-3 p-4 border border-gray-100 rounded-[3px]">
      <Image src={image} alt="Mobile 1" width={202} height={172} />
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
