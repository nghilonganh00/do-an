import { ChevronUp } from "../../icons";
import { useState, useRef, useEffect, useCallback } from "react";

export type DropdownItem = {
  label: string;
  value: string;
};

interface DropdownProps {
  value: DropdownItem;
  options: DropdownItem[];
  onChange?: (value: DropdownItem) => void;
  className?: string;
}

export default function Dropdown({ value, options, onChange, className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownItem>();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

  const handleSelect = useCallback(
    (option: DropdownItem) => {
      setSelectedOption(option);
      setIsOpen(false);
      if (onChange) onChange(option);
    },
    [onChange]
  );

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        className="w-full flex justify-between items-center px-4 py-2 border border-gray-100 rounded cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-body-small-400">{selectedOption?.label}</span>
        <ChevronUp className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>
      <ul
        className={`absolute top-full left-0 w-full bg-white border border-gray-100 rounded mt-1 shadow-md ${
          isOpen ? "block" : "hidden"
        } z-10`}
      >
        {options.map((option) => (
          <li
            key={option.value}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelect(option)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
