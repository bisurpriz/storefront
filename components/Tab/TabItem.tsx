import { Tab as BaseTab, TabProps } from "@mui/base/Tab";
import clsx from "clsx";
import React, { FC } from "react";

const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === "function" ? fn(args) : fn;

const TabItem: FC<TabProps> = (props) => {
  return (
    <BaseTab
      ref={props.ref}
      {...props}
      slotProps={{
        ...props.slotProps,
        root: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `font-sans
                transition-all duration-300
                ${
                  ownerState.selected
                    ? "text-primary bg-white"
                    : "text-white bg-transparent focus:text-white hover:bg-primary-dark"
                } ${
                ownerState.disabled
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              } text-sm leading-[1.3] font-semibold w-full py-2.5 px-3 m-1.5 border-0 rounded-sm flex justify-center focus:outline-0 focus:shadow-outline-orange-light`,
              resolvedSlotProps?.className
            ),
          };
        },
      }}
    />
  );
};

export default TabItem;
