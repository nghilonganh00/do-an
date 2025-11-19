"use client";

import Dropdown from "@/src/components/common/input/Dropdown";
import { Search } from "@/src/components/icons";
import { useRouter } from "next/navigation";

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    inventory: 32,
    color: "Black Titanium",
    price: 999,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    inventory: 12,
    color: "Silver",
    price: 899,
    rating: 4.5,
  },
  {
    id: 3,
    name: "Google Pixel 9",
    inventory: 8,
    color: "Obsidian",
    price: 799,
    rating: 4.6,
  },
];

const ProductManagementPage = () => {
  const router = useRouter();

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
          <div className="w-[180px] h-[48px]">
            <Dropdown value="Filter" />
          </div>

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
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Inventory</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Color</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Price</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Rating</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm text-gray-800">{product.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{product.inventory}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{product.color}</td>

                <td className="px-6 py-4 text-right text-sm text-gray-700">${product.price.toLocaleString()}</td>

                <td className="px-6 py-4 text-right text-sm font-medium text-gray-700">{product.rating} (32 Votes)</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagementPage;
