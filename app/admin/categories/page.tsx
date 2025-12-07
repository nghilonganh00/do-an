"use client";

import { useGetCategoriesWithTotal } from "@/src/features/category/hooks/useGetCategoriesWithTotal";
import { useRouter } from "next/navigation";

const CategoriesPage = () => {
  const router = useRouter();

  const { data: categories } = useGetCategoriesWithTotal();

  return (
    <div className="px-10 py-6 ">
      <div className="flex items-center justify-between">
        <span className="text-body-xl-600">Categories</span>

        <button
          className="h-10 px-6 bg-[#1E5EFF] text-white rounded-sm"
          onClick={() => router.push("/admin/categories/add")}
        >
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-[30px]">
        {categories?.map((cat, idx) => (
          <button
            key={idx}
            className="flex flex-col justify-between items-center bg-white rounded-md shadow"
            onClick={() => router.push("/admin/categories/" + cat?.id)}
          >
            <img
              src={cat?.image || "/placeholder.png"}
              alt="Category Image"
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />

            <div className="px-7 py-5">
              <h5 className="font-semibold text-gray-800">{cat?.name || ""}</h5>
              <span className="text-gray-500">{cat?.totalProduct || 0} items</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
