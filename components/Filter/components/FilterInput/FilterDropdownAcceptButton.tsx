import Button from "@/components/Button";
import clsx from "clsx";
import React, { FC } from "react";

type FilterDropdownAcceptButtonProps = {
  handleClear: () => void;
};

const FilterDropdownAcceptButton: FC<FilterDropdownAcceptButtonProps> = ({
  handleClear,
}) => {
  return (
    <div className={clsx("py-2 px-4 w-full flex items-end justify-between")}>
      <Button
        variant="outlined"
        color="info"
        size="small"
        onClick={handleClear}
      >
        Sıfırla
      </Button>
      <Button variant="outlined" color="secondary" size="small">
        Uygula
      </Button>
    </div>
  );
};

export default FilterDropdownAcceptButton;
