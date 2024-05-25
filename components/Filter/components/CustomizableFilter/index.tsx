import React, { FC } from "react";
import ButtonCheckbox from "../ButtonCheckbox";
import { HandleFilterSubmit } from "../..";

type CustomizableFilterProps = {
  customizable: boolean;
  handleFilterSubmit: HandleFilterSubmit;
};

const CustomizableFilter: FC<CustomizableFilterProps> = ({
  handleFilterSubmit,
  customizable,
}) => {
  return (
    <ButtonCheckbox
      label={"Özelleştirilebilir"}
      checked={!!customizable}
      onChange={(check) =>
        handleFilterSubmit("customizable", check ? "true" : "")
      }
    />
  );
};

export default CustomizableFilter;
