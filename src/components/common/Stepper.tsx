"use client";

type Props = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
};

export default function Stepper({ value, onChange, min = 1, max = 999, className }: Props) {
  const decrease = () => value > min && onChange(value - 1);
  const increase = () => value < max && onChange(value + 1);

  return (
    <div
      className={`flex items-center justify-between px-5 py-4 border border-gray-100 rounded-xs h-full select-none ${className}`}
    >
      <button onClick={decrease} className="text-lg">
        -
      </button>
      <span className="text-lg">{String(value).padStart(2, "0")}</span>
      <button onClick={increase} className="text-lg">
        +
      </button>
    </div>
  );
}
