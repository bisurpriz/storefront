import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, select, boolean } from "@storybook/addon-knobs";
import Button from "../components/Button";

export default {
  title: "Button",
  component: Button,
  decorators: [withKnobs], // Knobs addon'unu kullanabilmek için gerekli decorator
};

export const InteractiveButton = () => {
  // Knobs ile kontrol seçenekleri ekleyin
  const label = text("Label", "Click me");
  const size = select("Size", ["small", "medium", "large"], "medium");
  const color = select(
    "Color",
    ["primary", "error", "warning", "secondary", "success", "info"],
    "primary"
  );
  const fullWidth = boolean("Full Width", false);
  const rounded = boolean("Rounded", true);
  const loading = boolean("Loading", false);
  const disabled = boolean("Disabled", false);

  return (
    <Button
      label={label}
      onClick={action("Button clicked")}
      size={size}
      color={color}
      fullWidth={fullWidth}
      rounded={rounded}
      loading={loading}
      disabled={disabled}
    />
  );
};
