import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import HourSelect from "@/components/DatePicker/HourSelect";

export default {
  title: "HourSelect",
  component: HourSelect,
} as Meta;

const Template: StoryFn = () => <HourSelect />;

export const Default = Template;
