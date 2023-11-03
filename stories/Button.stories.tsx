import React from "react";
import {
  withKnobs,
  text,
  select,
  boolean,
  number,
} from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { BsFillWebcamFill } from "react-icons/bs";
import Button from "@/components/Button";

export default {
  title: "Button",
  component: Button,
  decorators: [withKnobs], // withKnobs decorator'ını ekliyoruz
};

export const Default = () => (
  <Button
    label={text("Label", "Default Button")}
    onClick={action("clicked")}
    size={select("Size", ["small", "medium", "large"], "medium")}
    color={select(
      "Color",
      ["primary", "error", "warning", "secondary", "success", "info"],
      "primary"
    )}
    disabled={boolean("Disabled", false)}
    fullWidth={boolean("Full Width", false)}
    rounded={boolean("Rounded", true)}
    loading={boolean("Loading", false)}
    variant={select(
      "Variant",
      ["default", "outlined", "dashed", "link"],
      "default"
    )}
  />
);

// with icon
export const WithIcon = () => (
  <Button
    label={text("Label", "Default Button")}
    onClick={action("clicked")}
    size={select("Size", ["small", "medium", "large"], "medium")}
    color={select(
      "Color",
      ["primary", "error", "warning", "secondary", "success", "info"],
      "primary"
    )}
    disabled={boolean("Disabled", false)}
    fullWidth={boolean("Full Width", false)}
    rounded={boolean("Rounded", true)}
    loading={boolean("Loading", false)}
    variant={select(
      "Variant",
      ["default", "outlined", "dashed", "link"],
      "default"
    )}
    icon={<BsFillWebcamFill />}
    iconSize={number("Icon Size", 20)}
  />
);
