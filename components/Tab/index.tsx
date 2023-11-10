// src/components/Tab.tsx
import React, { useState } from "react";

const Tab: React.FC<TabsProps> = ({
  tabs,
  bordered,
  onTabChange,
  activeTab,
}) => {
  const [selectedTab, setSelectedTab] = useState<TabProps>(tabs[0]);

  const borderedClass = bordered ? "border rounded" : "";

  const handleChange = (tab: TabProps) => {
    setSelectedTab(tab);
    onTabChange && onTabChange(tab);
  };

  return (
    <div className={`p-4 ${borderedClass}`}>
      <div className="flex mb-4">
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => handleChange(tab)}
            className={`cursor-pointer px-4 py-2 relative  transition duration-300 ease-in-out`}
          >
            {tab.label}
            <div
              className={`absolute bottom-0 left-0 h-1 bg-blue-500 transition duration-300 ease-in-out transform translate-x-0 w-full ${
                selectedTab.id === tab.id ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </div>
        ))}
      </div>
      <div className="transition duration-300 ease-in-out">
        {selectedTab.content}
      </div>
    </div>
  );
};

export default Tab;
