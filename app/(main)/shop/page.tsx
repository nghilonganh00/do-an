"use client";

import ProductCard from "@/src/components/common/card/ProductCard";
import CheckBox from "@/src/components/common/input/Checkbox";
import Dropdown from "@/src/components/common/input/Dropdown";
import RadioGroup, { RadioGroupItem } from "@/src/components/common/input/RadioGroup";
import { Line } from "@/src/components/common/Line";
import Tag from "@/src/components/common/Tag";
import { Search } from "@/src/components/icons";
import { ArrowRight } from "@/src/components/icons/ArrowRight";
import { X } from "@/src/components/icons/X";
import { useState } from "react";

const CATEGORIES: RadioGroupItem[] = [
  { id: 1, label: "Electronics Devices", value: "electronics-devices" },
  { id: 2, label: "Computer & Laptop", value: "computer-laptop" },
  { id: 3, label: "Computer Accessories", value: "computer-accessories" },
  { id: 4, label: "SmartPhone", value: "smartphone" },
  { id: 5, label: "Headphone", value: "headphone" },
  { id: 6, label: "Mobile Accessories", value: "mobile-accessories" },
  { id: 7, label: "Gaming Console", value: "gaming-console" },
  { id: 8, label: "Camera & Photo", value: "camera-photo" },
  { id: 9, label: "TV & Homes Appliances", value: "tv-homes-appliances" },
  { id: 10, label: "Watchs & Accessories", value: "watchs-accessories" },
];

const PRICE_RANGES = [
  "All Price",
  "Under $20",
  "$25 to $100",
  "$100 to $300",
  "$300 to $500",
  "$500 to $1,000",
  "$1,000 to $10,000",
];

const POPULAR_BRANDS = ["Apple", "Google", "Microsoft", "Samsung", "DELL", "HP", "Symphony", "Xiaomi", "Sony", ""];

const POPULAR_TAGS = [
  "Game",
  "iPhone",
  "TV",
  "Asus Laptops",
  "Macbook",
  "SSD",
  "Graphics Card",
  "Power Bank",
  "Smart TV",
  "Speaker",
  "Tablet",
];

const PRODUCTS = [
  {
    id: 1,
    name: "TOZO T6 True Wireless Earbuds Bluetooth Headphon...",
    image: "/assets/images/mobile-1.png",
    stars: 738,
    price: 70,
  },
  {
    id: 2,
    name: "Samsung Electronics Samsung Galexy S21 5G",
    image: "/assets/images/mobile-1.png",
    stars: 738,
    price: 70,
  },
  {
    id: 3,
    name: "Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K/6...",
    image: "/assets/images/mobile-1.png",
    stars: 738,
    price: 70,
  },
  {
    id: 4,
    name: "Portable Wshing Machine, 11lbs capacity Model 18NMF...",
    image: "/assets/images/mobile-1.png",
    stars: 738,
    price: 70,
  },
  {
    id: 5,
    name: "TOZO T6 True Wireless Earbuds Bluetooth Headphon...",
    image: "/assets/images/mobile-1.png",
    stars: 738,
    price: 70,
  },
];

export default function ShopPage() {
  const [category, setCategory] = useState(CATEGORIES[0]);
  return (
    <div className="w-full">
      <div className="max-w-[1320px] grid grid-cols-12 mx-auto pt-10 gap-6">
        <div className="col-span-3">
          <div>
            <span className="text-label-2 uppercase">Category</span>
            <div className="mt-4">
              <RadioGroup list={CATEGORIES} value={category} onChange={(category) => setCategory(category)} />
            </div>
          </div>

          <Line my={3} />

          <div className="w-full">
            <span className="text-label-2 uppercase">Price Range</span>
            <div className="w-full flex items-center gap-3 mt-3">
              <input
                placeholder="Min price"
                className="flex-1 min-w-0 h-10 px-4 py-2 outline-none text-gray-700 placeholder-gray-400 border border-gray-100 rounded-[3px]"
              />
              <input
                placeholder="Max price"
                className="flex-1 min-w-0 h-10 px-4 py-2 outline-none text-gray-700 placeholder-gray-400 border border-gray-100 rounded-[3px]"
              />
            </div>

            <div className="space-y-3 mt-4">
              {PRICE_RANGES.map((category, index) => (
                <button key={index} className="flex items-center gap-2">
                  <div className="w-5 h-5 border rounded-full border-gray-200" />
                  <span className="text-body-small-500">{category}</span>
                </button>
              ))}
            </div>
          </div>

          <Line my={3} />

          <div className="w-full">
            <span className="text-label-2 uppercase">Popular Brands</span>

            <div className="grid grid-cols-12 space-y-3 mt-4 gap-2">
              {POPULAR_BRANDS.map((category, index) => (
                <div key={index} className="col-span-6 flex items-center gap-2">
                  <CheckBox />
                  <span className="text-body-small-500">{category}</span>
                </div>
              ))}
            </div>
          </div>

          <Line my={3} />

          <div className="w-full">
            <span className="text-label-2 uppercase">Popular Tag</span>

            <div className="flex flex-wrap gap-2 mt-4">
              {POPULAR_TAGS.map((tag, index) => (
                <Tag key={index} title={tag} />
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-9 ">
          <div className="w-full grid grid-cols-12 gap-4">
            <div className="col-span-5 flex items-center bg-white rounded-md shadow-sm overflow-hidden">
              <input
                type="text"
                placeholder="Search for anything..."
                className="h-11 flex-1 px-4 py-2 outline-none text-gray-700 placeholder-gray-400"
              />
              <Search className="w-5 h-5 text-gray-500 mr-3" />
            </div>

            <div className="col-span-7 flex gap-[22px] justify-end items-center">
              <span className="text-body-small-400">Sort by:</span>
              <div className="w-[180px] h-11">{/* <Dropdown value="Most Popular" /> */}</div>
            </div>
          </div>

          <div className="flex items-center justify-between px-6 py-3 mt-4 bg-gray-50">
            <div className="flex gap-4 items-center">
              <span className="text-body-small-400 text-gray-600">Active Filters:</span>
              <div className="flex gap-1.5 items-center">
                <span className="text-body-small-400">Electronics Devices</span>
                <X width={12} height={12} color="#929FA5" />
              </div>
              <div className="flex gap-1.5 items-center">
                <span className="text-body-small-400">5 Star Rating</span>
                <X width={12} height={12} color="#929FA5" />
              </div>
            </div>
            <span className="text-body-small-400 text-gray-600">
              <span className="text-body-small-600">65,867</span> Results found.
            </span>
          </div>

          <div className="grid grid-cols-12 gap-4 mt-6">
            {PRODUCTS.map((product) => (
              <ProductCard productVariant={product} key={product.id} />
            ))}
          </div>

          <div className="center gap-2">
            <div className="size-10 rounded-full center border-[1.5px] border-primary-500 bg-primary-500">
              <span className="text-body-small-600 text-gray">01</span>
            </div>
            <div className="size-10 rounded-full center border-[1.5px] border-gray-100">
              <span className="text-body-small-400">02</span>
            </div>
            <div className="size-10 rounded-full center border-[1.5px] border-gray-100">
              <span className="text-body-small-400">03</span>
            </div>
            <div className="size-10 rounded-full center border-[1.5px] border-primary-500">
              <ArrowRight color="#FA8232" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
