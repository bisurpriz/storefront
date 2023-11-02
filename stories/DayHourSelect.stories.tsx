import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import DayHourSelect from "@/components/DatePicker/DayHourSelect";

export default {
  title: "DayHourSelect",
  component: DayHourSelect,
} as Meta;

const Template: StoryFn = () => <DayHourSelect />;

export const Default = Template;
