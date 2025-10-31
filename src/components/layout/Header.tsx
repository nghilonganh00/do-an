import { Heart, Search, ShoppingCart, User } from "../icons";

export default function Header() {
  return (
    <div className="w-full bg-secondary-700">
      <div className="max-w-[1320px] mx-auto flex items-center justify-between py-5 gap-4">
        <div className="text-white font-bold text-lg">Icon</div>

        <div className="flex-1 max-w-[646px] flex items-center bg-white rounded-md overflow-hidden shadow-sm">
          <input
            type="text"
            placeholder="Search for anything..."
            className="flex-1 px-4 py-2 outline-none text-gray-700 placeholder-gray-400"
          />
          <Search className="w-5 h-5 text-gray-500 mr-3" />
        </div>

        <div className="flex items-center gap-4 text-white">
          <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-gray-200" />
          <Heart width={32} height={32} className="w-6 h-6 cursor-pointer hover:text-gray-200" />
          <User className="w-6 h-6 cursor-pointer hover:text-gray-200" />
        </div>
      </div>
    </div>
  );
}
