"use client";

import { useState } from "react";
import { Check } from "../../icons/Check";

export default function CheckBox() {
  const [checked, setChecked] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setChecked(!checked)}
      className={`p-px self-start rounded-xs border-2 box-content transition-colors duration-200 ${
        checked ? "bg-primary-500 border-primary-500" : "bg-white border-gray-300"
      }`}
    >
      {checked ? <Check className="text-white" /> : <div className="w-3.5 h-3.5" />}
    </button>
  );
}
