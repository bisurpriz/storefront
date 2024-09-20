"use client";

import { Tabs } from "@mui/base/Tabs";
import { FC } from "react";
import TabPanel from "./TabPanel";
import TabList from "./TabList";
import TabItem from "./TabItem";

interface CustomTabProps {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface CustomTabsProps {
  tabs: CustomTabProps[];
  defaultValue?: number;
}

const CustomTab: FC<CustomTabsProps> = ({ tabs, defaultValue }) => {
  return (
    <div>
      <Tabs defaultValue={defaultValue || tabs[0].id}>
        <TabList>
          {tabs.map((tab, index) => (
            <TabItem key={index} value={tab.id}>
              {tab.label}
            </TabItem>
          ))}
        </TabList>

        {tabs.map((tab, index) => (
          <TabPanel key={index} value={tab.id}>
            {tab.content}
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export { CustomTab };
