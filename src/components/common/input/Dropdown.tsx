import { ChevronUp } from "../../icons";

export default function Dropdown({ value }: { value: string }) {
  return (
    <div className="w-full h-full flex justify-between items-center px-4  border border-gray-100 rounded-xs">
      <span className="text-body-small-400">{value}</span>
      <ChevronUp />
    </div>
  );
}
