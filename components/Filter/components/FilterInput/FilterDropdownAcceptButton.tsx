import { Button } from "@/components/ui/button";
import clsx from "clsx";
import React, { FC } from "react";

type FilterDropdownAcceptButtonProps = {
  handleClear: () => void;
  handleFilterSubmit?: () => void;
};

const FilterDropdownAcceptButton: FC<FilterDropdownAcceptButtonProps> = ({
  handleClear,
  handleFilterSubmit,
}) => {
  return (
    <div
      className={clsx(
        "py-2 px-4 w-full flex items-end justify-between border-t"
      )}
    >
      <Button variant="outline" color="info" size="sm" onClick={handleClear}>
        Sıfırla
      </Button>
      <Button
        variant="outline"
        color="secondary"
        size="sm"
        onClick={handleFilterSubmit && handleFilterSubmit}
      >
        Uygula
      </Button>
    </div>
  );
};

export default FilterDropdownAcceptButton;
