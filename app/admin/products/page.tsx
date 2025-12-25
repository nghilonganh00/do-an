"use client";

import Dropdown, { DropdownItem } from "@/src/components/common/input/Dropdown";
import Pagination from "@/src/components/common/Pagination/Pagination";
import { Search } from "@/src/components/icons";
import { useGetCategoriesWithTotal } from "@/src/features/category/hooks/useGetCategoriesWithTotal";
import { GetProductsForAdminParams } from "@/src/features/products/apis/getAllProductsForAdmin";
import { useGetAllProductsForAdmin } from "@/src/features/products/hooks/useGetAllProductsForAdmin";
import type { Product } from "@/src/types/product";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const Product = ({ product, onClick }: { product: Product; onClick: () => void }) => {
  const inventory = product?.variants?.reduce((acc, variant) => acc + (variant?.stock || 0), 0);
  return (
    <>
      <tr key={product.id} className="button hover:bg-gray-50 transition" onClick={onClick}>
        <td className="px-6 py-4 text-sm text-gray-800">{product.name}</td>
        <td className="px-6 py-4 text-center text-sm text-gray-600">{product?.variants?.length || 0}</td>
        <td className="px-6 py-4 text-center text-sm text-gray-700">{product?.soldCount || 0}</td>
        <td className="px-6 py-4 text-sm text-gray-800 text-center">{inventory || 0}</td>
        <td className="px-6 py-4 text-right text-sm font-medium text-gray-700">
          {product?.stars || 0} ({product?.feedbackCount || 0} đánh giá)
        </td>
        <td className="px-6 py-4 text-right text-sm font-medium text-gray-700">
          {dayjs(product?.created_at).format("HH:MM DD-MM-YYYY") || product?.created_at || ""}
        </td>
      </tr>
    </>
  );
};

const ProductManagementPage = () => {
  const router = useRouter();

  const [params, setParams] = useState<GetProductsForAdminParams>({
    page: 1,
    limit: 10,
    sortBy: "created_at",
    query: "",
    sortDir: "desc",
    categoryId: undefined,
  });

  const { data: categories } = useGetCategoriesWithTotal();

  const categoryItems: DropdownItem[] = useMemo(() => {
    const mapped =
      categories?.map((category) => ({
        label: category.name || "",
        value: category.id.toString() || "",
      })) || [];

    return [{ label: "Tất cả danh mục", value: "undefined" }, ...mapped];
  }, [categories]);

  const { data: data } = useGetAllProductsForAdmin({
    page: params.page,
    limit: params.limit,
    query: params.query,
    sortBy: params.sortBy,
    sortDir: params.sortDir,
    categoryId: params.categoryId,
  } as GetProductsForAdminParams);

  const selectedCategory: DropdownItem = useMemo(() => {
    if (!params.categoryId) {
      return { label: "Tất cả danh mục", value: "undefined" };
    }

    const category = categories?.find((c) => c.id === params.categoryId) || null;
    return { label: category?.name || "", value: category?.id.toString() || "" };
  }, [categories, params.categoryId]);

  const handleSort = (column: string) => {
    setParams((prev) => ({
      ...prev,
      sortBy: column,
      sortDir: prev.sortBy === column && prev.sortDir === "asc" ? "desc" : "asc",
      page: 1,
    }));
  };

  return (
    <div className="px-10 py-6 ">
      <div className="flex items-center justify-between">
        <span className="text-body-xl-600">Sản phẩm</span>
        <button className="px-[30px] py-2 bg-[#1E5EFF] text-white" onClick={() => router.push("/admin/products/add")}>
          Thêm sản phẩm
        </button>
      </div>

      <div className=" bg-white px-7 py-8 mt-[30px]">
        <div className="flex gap-3">
          <div className="flex gap-3">
            <div className="w-[180px]">
              <Dropdown
                value={selectedCategory}
                options={categoryItems}
                onChange={(item) => setParams({ ...params, categoryId: Number(item.value) })}
              />
            </div>
          </div>

          <div className="w-full flex items-center bg-white rounded-md shadow-sm overflow-hidden">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              defaultValue={params.query}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setParams({ ...params, query: (e.target as HTMLInputElement).value, page: 1 });
                }
              }}
              className="h-11 flex-1 px-4 py-2 outline-none text-gray-700 placeholder-gray-400"
            />
            <Search className="w-5 h-5 text-gray-500 mr-3" />
          </div>
        </div>

        <table className="min-w-full mt-5 border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Sản phẩm
              </th>
              <th
                className="px-6 py-3 text-center text-sm font-semibold text-gray-700 cursor-pointer"
                onClick={() => handleSort("variantsCount")}
              >
                Số biến thể
              </th>
              <th
                className="px-6 py-3 text-center text-sm font-semibold text-gray-700 cursor-pointer"
                onClick={() => handleSort("soldCount")}
              >
                Đã bán
              </th>
              <th
                className="px-6 py-3 text-center text-sm font-semibold text-gray-700 cursor-pointer"
                onClick={() => handleSort("inventory")}
              >
                Tồn kho
              </th>
              <th
                className="px-6 py-3 text-right text-sm font-semibold text-gray-700 cursor-pointer"
                onClick={() => handleSort("stars")}
              >
                Đánh giá
              </th>
              <th
                className="px-6 py-3 text-right text-sm font-semibold text-gray-700 cursor-pointer"
                onClick={() => handleSort("created_at")}
              >
                Ngày tạo
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {data?.data?.map((product) => (
              <Product
                key={product.id}
                product={product}
                onClick={() => router.push(`/admin/products/${product.id}`)}
              />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        page={params.page || 1}
        totalPages={10}
        onChange={(page) => setParams({ ...params, page })}
        className="mt-7"
      />
    </div>
  );
};

export default ProductManagementPage;
