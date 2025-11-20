"use client";

import { TabItem } from "@/src/types";
import { useCallback } from "react";
import { pl } from "zod/v4/locales";

const DefaultTabLabel: TabItem = {
  label: "Tất cả",
  value: null,
};

type TabsBarProps = {
  tabs: TabItem[];
  activeTab: TabItem | null;
  defaultTabLabel?: TabItem;
  onChange: (tab: TabItem | null) => void;
};

export default function TabsBar({ tabs, activeTab, defaultTabLabel = DefaultTabLabel, onChange }: TabsBarProps) {
  const handleChange = useCallback(
    (newTab: TabItem | null) => {
      if (activeTab !== newTab) {
        onChange(newTab);
      }
    },
    [activeTab, onChange]
  );

  return (
    <div role="tablist" className="flex gap-2 bg-white p-2 rounded">
      {[defaultTabLabel, ...tabs].map((t, i) => (
        <button
          key={t.label}
          role="tab"
          aria-selected={activeTab === t}
          onClick={() => handleChange(t)}
          className={
            "p-2  border-b-2 " +
            (activeTab?.value === t.value
              ? " text-body-small-600 border-primary-500  "
              : " text-body-small-400 text-gray-600 border-none hover:bg-gray-100")
          }
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
