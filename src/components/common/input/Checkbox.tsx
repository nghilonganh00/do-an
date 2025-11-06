"use client";

import { useState } from "react";
import { Check } from "../../icons/Check";

export default function CheckBox({ title, style }: { title?: string; style?: React.CSSProperties }) {
  const [checked, setChecked] = useState(false);

  return (
    <button className="flex items-center gap-3" style={style} onClick={() => setChecked(!checked)}>
      <div
        className={`p-px self-start rounded-xs border-2 box-content transition-colors duration-200 ${
          checked ? "bg-primary-500 border-primary-500" : "bg-white border-gray-300"
        }`}
      >
        {checked ? <Check className="text-white" /> : <div className="w-3.5 h-3.5" />}
      </div>

      <span className="text-body-small-400 text-gray-700">{title}</span>
    </button>
  );
}
