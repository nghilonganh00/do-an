import { link } from "fs";
import Link from "next/link";

const MENU_ITEMS = [
  {
    id: 1,
    name: "Dashboard",
    link: "/admin/dashboard",
  },
  {
    id: 2,
    name: "Order",
    link: "/admin/orders",
  },
  {
    id: 3,
    name: "Products",
    link: "/admin/products",
  },
  {
    id: 4,
    name: "Categories",
    link: "/admin/categories",
  },
  {
    id: 5,
    name: "Customers",
    link: "/admin/customers",
  },
  {
    id: 6,
    name: "Reports",
    link: "",
  },
  {
    id: 7,
    name: "Coupons",
    link: "/admin/coupons",
  },
  {
    id: 8,
    name: "Inbox",
    link: "",
  },
];

const Sidebar = () => {
  return (
    <div className="flex flex-col w-[250px] h-screen bg-[#1E2753] p-4">
      {MENU_ITEMS.map((item) => {
        return (
          <Link
            key={item.id}
            href={item.link}
            className="text-white px-4 py-2.5 rounded-sm hover:bg-[#FFFFFF] hover:text-[#5A607F]"
          >
            <span>{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
