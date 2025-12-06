"use client";

import { Search } from "@/src/components/icons";
import { useGetAllProductsForAdmin } from "@/src/features/products/hooks/useGetAllProductsForAdmin";
import { Params } from "@/src/types";
import type { Product } from "@/src/types/product";
import { formatPriceVN } from "@/src/utils/formatPriceVN";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const Product = ({ product, onClick }: { product: Product; onClick: () => void }) => {
  console.log("product: ", product);
  const inventory = product?.variants?.reduce((acc, variant) => acc + (variant?.stock || 0), 0);
  return (
    <>
      <tr key={product.id} className="button hover:bg-gray-50 transition" onClick={onClick}>
        <td className="px-6 py-4 text-sm text-gray-800">{product.name}</td>
        <td className="px-6 py-4 text-center text-sm text-gray-600">{product?.variants?.length || 0}</td>
        <td className="px-6 py-4 text-right text-sm text-gray-700">
          {formatPriceVN(product?.variants?.[0]?.price || 0)}
        </td>
        <td className="px-6 py-4 text-center text-sm text-gray-700">{1000}</td>
        <td className="px-6 py-4 text-sm text-gray-800 text-center">{inventory || 0}</td>
        <td className="px-6 py-4 text-right text-sm font-medium text-gray-700">
          {product?.stars || 0} ({product?.feedbackCount || 0} Votes)
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

  const { data: data } = useGetAllProductsForAdmin({
    page: 1,
    limit: 10,
    sortBy: "created_at",
    sortDir: "desc",
  } as Params);

  return (
    <div className="px-10 py-6 ">
      <div className="flex items-center justify-between">
        <span className="text-body-xl-600">Products</span>
        <button className="px-[30px] py-2 bg-[#1E5EFF] text-white" onClick={() => router.push("/admin/products/add")}>
          Add Product
        </button>
      </div>

      <div className=" bg-white px-7 py-8 mt-[30px]">
        <div className="flex gap-3">
          <div className="w-[180px] h-12">{/* <Dropdown value="Filter" /> */}</div>

          <div className="col-span-5 flex items-center bg-white rounded-md shadow-sm overflow-hidden">
            <input
              type="text"
              placeholder="Search for anything..."
              className="h-11 flex-1 px-4 py-2 outline-none text-gray-700 placeholder-gray-400"
            />
            <Search className="w-5 h-5 text-gray-500 mr-3" />
          </div>
        </div>

        <table className="min-w-full mt-5 border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Variants Count</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Price</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Sold</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Inventory</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Rating</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Created at</th>
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
    </div>
  );
};

export default ProductManagementPage;
