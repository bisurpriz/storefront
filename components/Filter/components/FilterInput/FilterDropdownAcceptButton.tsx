import Button from "@/components/Button";
import clsx from "clsx";
import React from "react";

const FilterDropdownAcceptButton = () => {
  return (
    <div className={clsx("py-2 px-4 w-full flex items-end justify-end")}>
      <Button variant="outlined" color="secondary">
        Uygula
      </Button>
    </div>
  );
};

export default FilterDropdownAcceptButton;
