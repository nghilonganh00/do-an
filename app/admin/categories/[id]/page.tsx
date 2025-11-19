import { Edit, Trash2 } from "lucide-react";

const items = [
  { name: "Women Striped T-Shirt", color: "bg-blue-300" },
  { name: "Men Casual Shirt", color: "bg-green-300" },
  { name: "Running Shoes", color: "bg-red-300" },
  { name: "Leather Bag", color: "bg-yellow-300" },
];

const CategoryDetailPage = () => {
  return (
    <div className="px-10 py-6 ">
      <div className="flex items-center justify-between">
        <span className="text-body-xl-600">Women Clothes</span>

        <div className="flex items-center gap-3">
          <button className="h-10 px-6 border border-[#D7DBEC] bg-white text-[#1E5EFF] rounded-sm">Cancel</button>
          <button className="h-10 px-6 bg-[#1E5EFF] text-white rounded-sm">Save</button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-[30px]">
        <div className="col-span-8 p-7 bg-white rounded-md">
          <div className="flex items-center justify-between">
            <div className="">
              Products <span>12</span>
            </div>

            <button className="h-10 px-6 bg-[#1E5EFF] text-white rounded-sm">Add product</button>
          </div>

          <div className="mt-6 space-y-3">
            {items.map((item, idx) => (
              <div key={idx} className="group flex items-center p-4 border border-[#E6E9F4] rounded-sm justify-between">
                <div className="flex items-center">
                  <div className={`w-12 h-12 ${item.color} mr-3 rounded`} />
                  <span className="text-gray-800">{item.name}</span>
                </div>

                <div className="flex items-center gap-4">
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity text-sm  text-gray-600 px-1 py-1 rounded">
                    <Edit size={14} />
                  </button>

                  <button className="opacity-0 group-hover:opacity-100 transition-opacity text-sm  text-gray-600 px-1 py-1 rounded">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-4 p-7 bg-white">
          <div>Category Info</div>

          <div className="mt-6">
            <label className="text-body-small-400">Category Name</label>
            <input className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2" />
          </div>

          <div className="flex flex-col gap-2 mt-6">
            <span className="text-sm font-medium text-gray-700">Images</span>

            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-700 
                   border border-gray-300 rounded-lg cursor-pointer bg-white 
                   focus:outline-none file:bg-gray-100 file:border-0 file:px-4 file:py-2 file:mr-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailPage;
