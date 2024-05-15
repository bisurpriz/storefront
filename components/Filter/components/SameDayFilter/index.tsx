import React, { FC } from "react";
import ButtonCheckbox from "../ButtonCheckbox";
import { HandleFilterSubmit } from "../..";

type SameDayFilterProps = {
  sameDayDelivery: boolean;
  handleFilterSubmit: HandleFilterSubmit;
};

const SameDayFilter: FC<SameDayFilterProps> = ({
  handleFilterSubmit,
  sameDayDelivery,
}) => {
  return (
    <ButtonCheckbox
      label={"Aynı gün teslimat"}
      checked={!!sameDayDelivery}
      onChange={(check) =>
        handleFilterSubmit("sameDayDelivery", check ? "true" : "")
      }
    />
  );
};

export default SameDayFilter;
