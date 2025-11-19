const categories = [
  { title: "Men Clothes", count: 24, color: "bg-amber-300" },
  { title: "Women Clothes", count: 32, color: "bg-pink-300" },
  { title: "Shoes", count: 18, color: "bg-green-300" },
  { title: "Accessories", count: 12, color: "bg-blue-300" },
];

const CategoriesPage = () => {
  return (
    <div className="px-10 py-6 ">
      <div className="flex items-center justify-between">
        <span className="text-body-xl-600">Categories</span>

        <button className="h-10 px-6 bg-[#1E5EFF] text-white rounded-sm">Add Category</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-[30px]">
        {categories.map((cat, idx) => (
          <div key={idx} className="bg-white rounded-md shadow">
            <div className={`h-[240px] ${cat.color} rounded-t-md`} />

            <div className="px-7 py-5">
              <h5 className="font-semibold text-gray-800">{cat.title}</h5>
              <span className="text-gray-500">{cat.count} items</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
