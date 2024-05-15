import React, { Dispatch, FC, SetStateAction } from "react";
import ButtonCheckbox from "../ButtonCheckbox";
import { HandleFilterSubmit } from "../CategoryFilter";

type SameDayFilterProps = {
  sameDayDelivery: boolean;
  setSameDayDelivery: Dispatch<SetStateAction<boolean>>;
  handleFilterSubmit: HandleFilterSubmit;
};

const SameDayFilter: FC<SameDayFilterProps> = ({
  handleFilterSubmit,
  sameDayDelivery,
  setSameDayDelivery,
}) => {
  return (
    <ButtonCheckbox
      label={"Aynı gün teslimat"}
      checked={!!sameDayDelivery}
      onChange={(check) => {
        handleFilterSubmit("sameDayDelivery", check ? "true" : "");
        setSameDayDelivery((prev) => !prev);
      }}
    />
  );
};

export default SameDayFilter;
