import { ProductOptionValue } from "@/src/types/product";
import { ChevronUp } from "../../icons";
import { useState, useRef, useEffect } from "react";

interface DropdownProps {
  value: ProductOptionValue;
  options: ProductOptionValue[];
  onChange?: (value: ProductOptionValue) => void;
}

export default function Dropdown({ value, options, onChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ProductOptionValue>();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  const handleSelect = (option: ProductOptionValue) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) onChange(option);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="w-full h-11 flex justify-between items-center px-4 py-2 border border-gray-100 rounded cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-body-small-400">{selectedOption?.value}</span>
        <ChevronUp
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>
      <ul
        className={`absolute top-full left-0 w-full bg-white border border-gray-100 rounded mt-1 shadow-md ${
          isOpen ? "block" : "hidden"
        } z-10`}
      >
        {options.map((option) => (
          <li
            key={option.id}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelect(option)}
          >
            {option.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
