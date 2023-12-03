// stories/TextField.stories.tsx
import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";

import TextField from "@/components/TextField";
import { BsCheck } from "react-icons/bs";

export default {
  title: "TextField",
  component: TextField,
} as Meta;

const Template: StoryFn<TextFieldProps> = (args) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <TextField
      {...args}
      value={inputValue}
      onChange={(e, value) => setInputValue(value)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Label",
};

export const WithPrefixAndSuffix = Template.bind({});
WithPrefixAndSuffix.args = {
  label: "Amount",
  prefix: "$",
  suffix: "USD",
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  label: "Email",
  icon: <i className="fas fa-envelope"></i>,
};

export const WithSuccessIcon = Template.bind({});
WithSuccessIcon.args = {
  label: "Password",
  type: "password",
  successIcon: <BsCheck />,
};

export const WithErrorMessage = Template.bind({});
WithErrorMessage.args = {
  label: "Email",
  errorMessage: "Email is required",
};
