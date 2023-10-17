import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import Dropdown from "../components/Dropdown";

export default {
  title: "Dropdown",
  component: Dropdown,
};

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

export const Default = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (value: string) => {
    setSelectedValue(value);
    action("Selected value")(value);
  };

  return (
    <Dropdown
      options={options}
      value={selectedValue}
      onChange={handleChange}
      label="Select an option"
    />
  );
};

export const Searchable = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (value: string) => {
    setSelectedValue(value);
    action("Selected value")(value);
  };

  return (
    <Dropdown
      options={options}
      value={selectedValue}
      onChange={handleChange}
      label="Search and select an option"
      isSearchable={true}
    />
  );
};

export const CustomNoOptionsMessage = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (value: string) => {
    setSelectedValue(value);
    action("Selected value")(value);
  };

  return (
    <Dropdown
      options={[]}
      value={selectedValue}
      onChange={handleChange}
      label="Select an option"
      noOptionsMessage="No options available"
    />
  );
};
