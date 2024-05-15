import React, { Dispatch, FC, SetStateAction } from "react";
import ButtonCheckbox from "../ButtonCheckbox";
import { HandleFilterSubmit } from "../CategoryFilter";

type SpecialOffersFilterProps = {
  specialOffers: boolean;
  setSpecialOffers: Dispatch<SetStateAction<boolean>>;
  handleFilterSubmit: HandleFilterSubmit;
};

const SpecialOffersFilter: FC<SpecialOffersFilterProps> = ({
  handleFilterSubmit,
  specialOffers,
  setSpecialOffers,
}) => {
  return (
    <ButtonCheckbox
      label={"Özel fırsatlar"}
      checked={!!specialOffers}
      onChange={(check) => {
        handleFilterSubmit("specialOffers", check ? "true" : "");
        setSpecialOffers((prev) => !prev);
      }}
    />
  );
};

export default SpecialOffersFilter;
