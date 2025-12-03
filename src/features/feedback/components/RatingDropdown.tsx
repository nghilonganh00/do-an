import { ChevronUp, Star } from "@/src/components/icons";
import { TabItem } from "@/src/types";
import { useState, useRef, useEffect } from "react";

interface DropdownProps {
  value: TabItem;
  options: TabItem[];
  onChange?: (value: TabItem) => void;
}

export default function RatingDropdown({
  value,
  options,
  onChange,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<TabItem>();
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

  const handleSelect = (option: TabItem) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) onChange(option);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="w-full flex justify-between items-center px-4 py-2 border border-gray-100 rounded cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex gap-0.5 items-center">
          {Array.from(
            { length: Number(selectedOption?.value || 0) },
            (_, i) => (
              <Star key={i} />
            )
          )}
          <span className="text-body-small-400">{selectedOption?.label}</span>
        </div>
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
            key={option.value}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-0.5"
            onClick={() => handleSelect(option)}
          >
            {Array.from({ length: Number(option?.value || 0) }, (_, i) => (
              <Star key={i} />
            ))}
            <span> {option.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
