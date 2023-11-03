import React, { useState } from "react";
import { StoryFn } from "@storybook/react";
import NumberInput, { NumberInputProps } from "@/components/NumberInput";
import { BsCheck } from "react-icons/bs";

export default {
  title: "NumberInput",
  component: NumberInput,
  argTypes: {
    value: { control: "number" },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    precision: { control: "number" },
    label: { control: "text" },
    className: { control: "text" },
    mask: { control: "text" },
    autoFocus: { control: "boolean" },
    iconPosition: { control: { type: "select", options: ["left", "right"] } },
  },
};

const Template: StoryFn<NumberInputProps> = (args) => {
  const [value, setValue] = useState(args.value);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return <NumberInput {...args} value={value} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {
  value: 0,
  min: 0,
  max: 100,
  step: 1,
  precision: 0,
  label: "Number:",
  iconPosition: "right",
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  value: 50,
  min: 0,
  max: 100,
  step: 5,
  precision: 0,
  label: "Quantity:",
  icon: <BsCheck />,
  iconPosition: "left",
};
