import React, { FC } from "react";
import ButtonCheckbox from "../ButtonCheckbox";
import { HandleFilterSubmit } from "../..";

type SpecialOffersFilterProps = {
  specialOffers: boolean;
  handleFilterSubmit: HandleFilterSubmit;
};

const SpecialOffersFilter: FC<SpecialOffersFilterProps> = ({
  handleFilterSubmit,
  specialOffers,
}) => {
  return (
    <ButtonCheckbox
      label={"Özel fırsatlar"}
      checked={!!specialOffers}
      onChange={(check) => {
        handleFilterSubmit("specialOffers", check ? "true" : "");
      }}
    />
  );
};

export default SpecialOffersFilter;
