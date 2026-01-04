"use client";

import { usePathname, useRouter } from "next/navigation";
import { Stack } from "../../icons/Stack";
import Link from "next/link";
import { StoreFront } from "../../icons/StoreFront";

const menuItems = [
  { name: "Bảng điều khiển", icon: Stack, path: "/dashboard", active: false },
  { name: "Lịch sử đơn hàng", icon: StoreFront, path: "/dashboard/orders", active: true },
  { name: "Theo dõi đơn hàng", icon: Stack, path: "/track", active: false },
  { name: "Giỏ hàng", icon: Stack, path: "/shopping-cart", active: false },
  { name: "Danh sách yêu thích", icon: Stack, path: "/wishlist", active: false },
  { name: "Cài đặt", icon: Stack, path: "/dashboard/setting", active: false },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const onLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/login");
  };

  return (
    <div className="w-[264px] border border-gray-100 py-4">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.path;
        return (
          <Link key={item.name} href={item.path}>
            <div className={`flex items-center px-6 py-2.5 gap-3 cursor-pointer ${isActive ? "bg-primary-500" : ""}`}>
              <Icon color={isActive ? "#fff" : "var(--color-gray-600)"} />
              <span className={`text-body-small-400 ${isActive ? "text-white" : "text-gray-600"}`}>{item.name}</span>
            </div>
          </Link>
        );
      })}
      <div onClick={onLogout}>
        <div className={`flex items-center px-6 py-2.5 gap-3 cursor-pointer`}>
          <Stack color={"var(--color-gray-600)"} />
          <span className={`text-body-small-400 ${"text-gray-600"}`}>Đăng xuất</span>
        </div>
      </div>
    </div>
  );
}
