"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs as ShaCdnTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { FC } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { cn } from "@/lib/utils";

interface CustomTabProps {
  id: string;
  label: string;
  content: React.ReactNode;
  description?: string;
}

interface CustomTabsProps {
  tabs: CustomTabProps[];
  defaultValue?: number;
}

const CustomTab: FC<CustomTabsProps> = ({ tabs, defaultValue }) => {
  const gridClass = `md:grid md:grid-cols-${tabs.length} md:gap-2`;

  return (
    <ShaCdnTabs
      defaultValue={defaultValue?.toString() || tabs[0].id.toString()}
      className="w-full"
    >
      <TabsList className={cn("w-full")}>
        <ScrollArea className={cn("w-full whitespace-nowrap")}>
          <div className={gridClass}>
            {tabs.map((tab, index) => (
              <TabsTrigger key={index} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </div>
          <ScrollBar orientation="horizontal" hidden />
        </ScrollArea>
      </TabsList>
      {tabs.map((tab, index) => (
        <TabsContent
          value={tab.id.toString() || defaultValue?.toString()}
          key={tab.id}
        >
          <Card>
            <CardHeader>
              <CardTitle>{tab.label}</CardTitle>
              {tab.description && (
                <CardDescription>{tab.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-2">{tab.content}</CardContent>
          </Card>
        </TabsContent>
      ))}
    </ShaCdnTabs>
  );
};

export { CustomTab };
