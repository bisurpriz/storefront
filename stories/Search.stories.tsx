import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, select } from "@storybook/addon-knobs";
import Search from "../components/Search";

export default {
  title: "Search",
  component: Search,
  decorators: [withKnobs], // Knobs addon'unu kullanabilmek için gerekli decorator
};

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

export const InteractiveSearch = () => {
  const selectedValue = text("Selected Value", ""); // Knob ile metin girişi
  const searchPlaceholder = text("Search Placeholder", "Search"); // Knob ile metin girişi
  const dropdownOptions = select(
    "Dropdown Options",
    options.map((option) => option.label), // Knob ile seçenekler
    "Option 1"
  );

  const handleChange = (value: string) => {
    action("Selected value")(value);
  };

  const handleSearch = () => {
    action("Search submitted")();
  };

  return (
    <Search
      options={options}
      value={selectedValue}
      onChange={handleChange}
      onSubmit={handleSearch}
      searchPlaceholder={searchPlaceholder}
    />
  );
};
