"use client";

import ProductCard from "@/src/components/common/card/ProductCard";
import TabsBar from "@/src/components/common/TabsBar";
import { Package, Star } from "@/src/components/icons";
import { Trophy } from "@/src/components/icons/Trophy";
import { X } from "@/src/components/icons/X";
import { useGetAllCategories } from "@/src/features/category/hooks/useGetAllCategories";
import { useGetAllFeatureProducts } from "@/src/features/products/hooks/useGetAllFeatureProducts";
import { useGetAllProductsForBrower } from "@/src/features/products/hooks/useGetProductsForBrower";
import { TabItem } from "@/src/types";
import { formatPriceVN } from "@/src/utils/formatPriceVN";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [isShowQuickView, setShowQuickView] = useState(true);

  const { data: categories } = useGetAllCategories();

  const categoryTabs: TabItem[] =
    categories?.map((c) => ({
      value: c?.id || "",
      label: c.name || "",
    })) || [];

  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<TabItem | null>(null);

  const { data: featureProducts } = useGetAllFeatureProducts();

  const { data: topRatedProductsData } = useGetAllProductsForBrower({
    limit: 4,
    sortBy: "starts",
    sortDir: "desc",
  });

  const handleToggleQuickView = useCallback(() => {
    setShowQuickView((prev) => !prev);
  }, []);

  return (
    <>
      <div className="w-full">
        <div className="max-w-[1320px] mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center gap-4 bg-white p-4 rounded-md shadow-sm">
              <Package className="w-8 h-8 text-secondary-700 shrink-0" />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">Giao hàng nhanh</span>
                <span className="text-gray-500 text-sm">Nhận hàng trong 24 giờ</span>
              </div>
            </div>

            <div className="flex flex-1 items-center gap-4 bg-white p-4 rounded-md shadow-sm">
              <Trophy className="w-8 h-8 text-secondary-700 shrink-0" />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">Đổi trả trong 24 giờ</span>
                <span className="text-gray-500 text-sm">Hoàn tiền 100%</span>
              </div>
            </div>

            <div className="flex flex-1 items-center gap-4 bg-white p-4 rounded-md shadow-sm">
              <Package className="w-8 h-8 text-secondary-700 shrink-0" />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">Thanh toán an toàn</span>
                <span className="text-gray-500 text-sm">Bảo mật tuyệt đối</span>
              </div>
            </div>

            <div className="flex flex-1 items-center gap-4 bg-white p-4 rounded-md shadow-sm">
              <Package className="w-8 h-8 text-secondary-700 shrink-0" />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">Hỗ trợ 24/7</span>
                <span className="text-gray-500 text-sm">Chat & gọi trực tiếp</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Danh mục sản phẩm</h2>
            </div>

            <div className="flex gap-6 overflow-x-auto no-scrollbar">
              {categories?.map((category, index) => (
                <div
                  key={index}
                  className="shrink-0 w-[205] h-[236] bg-white rounded-lg shadow hover:shadow-md transition flex flex-col items-center justify-center gap-3"
                >
                  <img src={category?.image} alt={category?.name} width={148} height={148} />
                  <div className="font-medium text-gray-800">{category?.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-[74px]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Sản phẩm nổi bật</h2>

              <div className="flex items-center gap-4 text-gray-600">
                <TabsBar
                  tabs={categoryTabs}
                  activeTab={selectedCategoryFilter}
                  onChange={(category) => setSelectedCategoryFilter(category)}
                />

                <button
                  className="text-body-small-600 text-primary text-primary-500 hover:underline"
                  onClick={() => router.push("/shop")}
                >
                  Xem tất cả
                </button>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
              {featureProducts?.slice(0, 12).map((product) => (
                <ProductCard key={product.id} product={product} className="col-span-2" />
              ))}
            </div>
          </div>

          <div className="flex gap-6 my-[72]">
            {["KHUYẾN MÃI HOT", "BÁN CHẠY NHẤT", "ĐÁNH GIÁ CAO", "SẢN PHẨM MỚI"].map((title, idx) => (
              <div key={idx} className="flex-1">
                <div className="mb-6">
                  <span className="text-body-medium-600">{title}</span>
                </div>

                <div className="space-y-4">
                  {topRatedProductsData?.data?.map((product, index) => (
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
                        <div className="text-body-small-600 text-secondary-500">
                          {formatPriceVN(product?.main_price || 0)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-[472] bg-black"></div>
      </div>

      {false && (
        <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center">
          <div className="absolute top-0 left-0 bg-black opacity-80 w-screen h-screen"></div>
          <div className="relative w-[80%] max-w-[1400] flex gap-14 bg-white z-10 p-10 rounded-sm">
            <button className="absolute top-3 right-3" onClick={handleToggleQuickView}>
              <X />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
