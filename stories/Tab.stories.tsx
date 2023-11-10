import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Tab from "@/components/Tab";

export default {
  title: "Tab",
  component: Tab,
} as Meta;

const tabs: TabProps[] = [
  {
    content: <div>Content 1</div>,
    label: "Tab 1",
    id: "tab-1",
  },
  {
    content: <div>Content 2</div>,
    label: "Tab 2",
    id: "tab-2",
  },
  {
    content: <div>Content 3</div>,
    label: "Burası tab  3",
    id: "tab-3",
  },
];

const Template: StoryFn = () => <Tab tabs={tabs} />;

export const Default = Template;
