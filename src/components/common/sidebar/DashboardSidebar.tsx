"use client";

import { usePathname } from "next/navigation";
import { Stack } from "../../icons/Stack";
import Link from "next/link";
import { StoreFront } from "../../icons/StoreFront";

const menuItems = [
  { name: "Dashboard", icon: Stack, path: "/dashboard", active: false },
  { name: "Order History", icon: StoreFront, path: "/dashboard/orders", active: true },
  { name: "Track Order", icon: Stack, path: "/track", active: false },
  { name: "Shopping Cart", icon: Stack, path: "/shopping-card", active: false },
  { name: "Wishlist", icon: Stack, path: "/wishlist", active: false },
  { name: "Compare", icon: Stack, path: "/compare", active: false },
  { name: "Setting", icon: Stack, path: "/dashboard/setting", active: false },
  { name: "Log-out", icon: Stack, path: "/logout", active: false },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

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
    </div>
  );
}
