"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Icons
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  CreditCard,
  Users,
  BarChart3,
  TicketPercent,
  Inbox,
} from "lucide-react";

const MENU_ITEMS = [
  {
    id: 1,
    name: "Tổng quan",
    link: "/admin/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    id: 2,
    name: "Đơn hàng",
    link: "/admin/orders",
    icon: <ShoppingCart size={18} />,
  },
  {
    id: 3,
    name: "Sản phẩm",
    link: "/admin/products",
    icon: <Package size={18} />,
  },
  {
    id: 4,
    name: "Giao dịch",
    link: "/admin/payments",
    icon: <CreditCard size={18} />,
  },
  {
    id: 5,
    name: "Khách hàng",
    link: "/admin/customers",
    icon: <Users size={18} />,
  },
  {
    id: 6,
    name: "Báo cáo",
    link: "",
    icon: <BarChart3 size={18} />,
  },
  {
    id: 7,
    name: "Mã giảm giá",
    link: "/admin/coupons",
    icon: <TicketPercent size={18} />,
  },
  {
    id: 8,
    name: "Hộp thư",
    link: "",
    icon: <Inbox size={18} />,
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-[250px] h-screen bg-[#1E2753] p-4 gap-1">
      {MENU_ITEMS.map((item) => {
        const isActive = pathname === item.link;

        return (
          <Link
            key={item.id}
            href={item.link || "#"}
            className={`
              flex items-center gap-3 px-4 py-2.5 rounded-md text-sm
              transition-all duration-200
              ${isActive ? "bg-white text-[#1E2753] font-semibold" : "text-white"}
              hover:bg-white hover:text-[#1E2753]
            `}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
