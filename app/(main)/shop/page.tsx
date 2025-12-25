"use client";

import ProductCard from "@/src/components/common/card/ProductCard";
import Dropdown from "@/src/components/common/input/Dropdown";
import RadioGroup, { RadioGroupItem } from "@/src/components/common/input/RadioGroup";
import { Line } from "@/src/components/common/Line";
import { Search } from "@/src/components/icons";
import { ArrowRight } from "@/src/components/icons/ArrowRight";
import { X } from "@/src/components/icons/X";
import { useGetAllCategories } from "@/src/features/category/hooks/useGetAllCategories";
import { GetProductsForBrowerParams } from "@/src/features/products/apis/getAllProuctsForBrower";
import { useGetAllProductsForBrower } from "@/src/features/products/hooks/useGetProductsForBrower";
import { useMemo, useState } from "react";

export default function ShopPage() {
  const { data: categories } = useGetAllCategories();

  // Danh sách danh mục cho RadioGroup
  const categoryRadioItems = useMemo(() => {
    const baseItems =
      categories?.map(
        (cat) =>
          ({
            id: cat.id,
            label: cat.name,
            value: cat.id.toString(),
          }) as RadioGroupItem
      ) ?? [];

    return [{ id: 0, label: "Tất cả danh mục", value: "0" }, ...baseItems];
  }, [categories]);

  const [params, setParams] = useState<GetProductsForBrowerParams>({
    page: 1,
    limit: 12,
    sortBy: "created_at",
    query: "",
    sortDir: "desc",
    categoryId: undefined,
    priceTo: undefined,
    priceFrom: undefined,
  });

  const { data: response } = useGetAllProductsForBrower(params);

  const updateParam = (key: keyof GetProductsForBrowerParams, value: any) => {
    setParams((prev) => ({ ...prev, page: 1, [key]: value }));
  };

  const presetPrice = [
    { label: "Tất cả", from: undefined, to: undefined },
    { label: "Dưới 200.000đ", from: 0, to: 200000 },
    { label: "200.000đ – 1.000.000đ", from: 200000, to: 1000000 },
    { label: "1.000.000đ – 5.000.000đ", from: 1000000, to: 5000000 },
    { label: "5.000.000đ – 10.000.000đ", from: 5000000, to: 10000000 },
    { label: "10.000.000đ – 20.000.000đ", from: 10000000, to: 20000000 },
    { label: "Trên 20.000.000đ", from: 20000000, to: undefined },
  ];

  const sortOptions = [
    { label: "Mới nhất", value: "created_at", dir: "desc" },
    { label: "Cũ nhất", value: "created_at", dir: "asc" },
    { label: "Giá tăng dần", value: "price", dir: "asc" },
    { label: "Giá giảm dần", value: "price", dir: "desc" },
  ];

  const activeFilters = [
    params.categoryId && {
      label: categories?.find((c) => c.id === params.categoryId)?.name,
      key: "categoryId",
    },
    params.priceFrom !== undefined &&
      params.priceTo !== undefined && {
        label: `${params.priceFrom}đ - ${params.priceTo}đ`,
        key: "price",
      },
    params.query && { label: params.query, key: "query" },
  ].filter(Boolean) as { label: string; key: string }[];

  const clearFilter = (key: string) => {
    if (key === "categoryId") updateParam("categoryId", undefined);
    if (key === "price") {
      updateParam("priceFrom", undefined);
      updateParam("priceTo", undefined);
    }
    if (key === "query") updateParam("query", "");
  };

  return (
    <div className="w-full">
      <div className="max-w-[1320px] grid grid-cols-12 mx-auto pt-10 gap-6">
        <div className="col-span-3">
          <div>
            <span className="text-label-2 uppercase">Danh mục</span>
            <div className="mt-4">
              <RadioGroup
                list={categoryRadioItems}
                value={categoryRadioItems.find((i) => i.value === (params.categoryId?.toString() ?? "0"))!}
                onChange={(cat) => updateParam("categoryId", cat.id === 0 ? undefined : cat.id)}
              />
            </div>
          </div>

          <Line my={6} />

          <div className="w-full mt-4">
            <span className="text-label-2 uppercase">Khoảng giá</span>

            <div className="w-full flex items-center gap-3 mt-3">
              <input
                placeholder="Giá thấp nhất"
                value={params.priceFrom ?? ""}
                onChange={(e) => updateParam("priceFrom", e.target.value ? Number(e.target.value) : undefined)}
                className="flex-1 min-w-0 h-10 px-4 py-2 border rounded"
              />
              <input
                placeholder="Giá cao nhất"
                value={params.priceTo ?? ""}
                onChange={(e) => updateParam("priceTo", e.target.value ? Number(e.target.value) : undefined)}
                className="flex-1 min-w-0 h-10 px-4 py-2 border rounded"
              />
            </div>

            <div className="space-y-3 mt-4">
              {presetPrice.map((p, i) => (
                <button
                  key={i}
                  onClick={() => {
                    updateParam("priceFrom", p.from);
                    updateParam("priceTo", p.to);
                  }}
                  className="flex items-center gap-2"
                >
                  <div className="w-5 h-5 border rounded-full" />
                  <span className="text-body-small-500">{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          <Line my={3} />
        </div>

        <div className="col-span-9">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-5 flex items-center bg-white rounded shadow overflow-hidden">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={params.query}
                onChange={(e) => updateParam("query", e.target.value)}
                className="h-11 flex-1 px-4 outline-none"
              />
              <Search className="w-5 h-5 text-gray-500 mr-3" />
            </div>

            <div className="col-span-7 flex items-center justify-end gap-4">
              <div className="flex gap-[22px] justify-end items-center">Sắp xếp theo:</div>
              <Dropdown
                options={sortOptions}
                value={sortOptions.find((o) => o.value === params.sortBy && o.dir === params.sortDir) ?? sortOptions[0]}
                onChange={(opt) => {
                  updateParam("sortBy", opt.value);
                  updateParam("sortDir", opt.dir);
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between px-6 py-3 mt-4 bg-gray-50">
            <div className="flex gap-4 items-center">
              {activeFilters.length === 0 ? (
                <span className="text-body-small-400">Chưa áp dụng bộ lọc nào.</span>
              ) : (
                <>
                  <span className="text-body-small-400">Bộ lọc đang dùng:</span>
                  {activeFilters.map((f, i) => (
                    <div key={i} className="flex gap-1 items-center">
                      <span className="text-body-small-400">{f.label}</span>
                      <button onClick={() => clearFilter(f.key)}>
                        <X width={12} height={12} color="#929FA5" />
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>

            <span className="text-body-small-400 text-gray-600">
              <span className="text-body-small-600">{response?.total ?? 0}</span> kết quả được tìm thấy.
            </span>
          </div>

          <div className="grid grid-cols-12 gap-4 mt-6">
            {response?.data?.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>

          <div className="center gap-2 mt-6">
            <button className="size-10 rounded-full center border border-primary-500 bg-primary-500">
              <span className="text-white">{params.page}</span>
            </button>

            <button
              className="size-10 rounded-full center border border-primary-500"
              onClick={() => updateParam("page", params.page + 1)}
            >
              <ArrowRight color="#FA8232" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
