import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import SearchInput, { SearchInputProps } from "@/components/Search";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "SearchInput",
  component: SearchInput,
  decorators: [withKnobs],
} as Meta;

const Template: StoryFn<SearchInputProps> = (args) => <SearchInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSearch: (query: string) => {
    console.log("Arama sorgusu:", query);
  },
  fullWidth: false,
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  onSearch: (query: string) => {
    console.log("Arama sorgusu:", query);
  },
  fullWidth: true,
};
