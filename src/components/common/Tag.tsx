"use client";

import { useState } from "react";

interface TagProps {
  title: string;
}

export default function Tag({ title }: TagProps) {
  const [selected, setSelected] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setSelected(!selected)}
      className={`px-3 py-1.5 border rounded-xs transition-colors duration-200 text-body-small-500 ${
        selected ? "bg-primary-50 border-primary-500 text-primary-500" : "border-gray-100  bg-white"
      }`}
    >
      <span>{title}</span>
    </button>
  );
}
