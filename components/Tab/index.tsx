"use client";

import { useState, FC } from "react";

const Tab: FC<TabsProps> = ({ tabs, bordered, onTabChange, activeTab }) => {
  const [selectedTab, setSelectedTab] = useState<TabProps>(
    tabs.find((tab) => tab.id === activeTab) || tabs[0]
  );

  const borderedClass = bordered ? "border rounded" : "";

  const handleChange = (tab: TabProps) => {
    if (onTabChange) {
      onTabChange(tab);
      setSelectedTab(tabs.find((tab) => tab.id === activeTab) || tabs[0]);
    } else {
      setSelectedTab(tab);
    }
  };

  return (
    <div className="p-4 overflow-hidden">
      <div
        className={`flex items-center justify-start overflow-x-auto mb-4 little-scroll
      ${borderedClass}
      `}
      >
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => handleChange(tab)}
            className={`cursor-pointer px-4 py-2 relative transition duration-300 ease-in-out whitespace-nowrap select-none`}
          >
            {tab.label}
            <div
              className={`absolute bottom-0 left-0 h-0.5 bg-blue-500 transition duration-300 ease-in-out transform translate-x-0 w-full ${
                selectedTab.id === tab.id
                  ? "scale-100"
                  : "scale-x-0 -translate-x-full"
              }`}
            />
          </div>
        ))}
      </div>
      <div
        className={`flex flex-1 transition duration-300 ease-in-out transform`}
      >
        {selectedTab.content}
      </div>
    </div>
  );
};

export default Tab;
