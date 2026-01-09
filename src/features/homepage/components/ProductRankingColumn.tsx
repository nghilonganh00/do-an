import { Star } from "@/src/components/icons";
import { ProductVariant } from "@/src/types/product";
import { formatPriceVN } from "@/src/utils/formatPriceVN";
import Image from "next/image";

const ProductRankingColumn = ({ title, data }: { title: string; data: ProductVariant[] | null }) => {
  return (
    <div className="flex-1">
      <div className="mb-6">
        <span className="text-body-medium-600">{title}</span>
      </div>

      <div className="space-y-4">
        {data?.map((ProductVariant, index) => {
          const product = ProductVariant?.product;

          return (
            <div
              key={index}
              className="bg-white rounded-[3px] h-[104] gap-3 border border-gray-100 flex shadow-sm hover:shadow-md transition overflow-hidden p-3"
            >
              <Image src={product?.images?.[0] || ""} width={80} height={80} alt={product?.name || "Image"} />
              <div>
                <h3 className="text-body-small-400 mb-2 line-clamp-2">{product?.name}</h3>
                <div className="flex gap-1 items-center mt-6">
                  <div className="flex gap-[1.5px]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} width={16} height={16} />
                    ))}
                  </div>
                  <span className="text-body-tiny-400 text-gray-500">({product?.stars} sao)</span>
                </div>
                <div className="text-body-small-600 text-secondary-500">{formatPriceVN(ProductVariant.price || 0)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductRankingColumn;
