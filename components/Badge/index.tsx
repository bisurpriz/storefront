"use client";

import clsx from "clsx";
import { Badge as BaseBadge, BadgeProps } from "@mui/base/Badge";
import { forwardRef, useEffect, useState } from "react";

const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === "function" ? fn(args) : fn;

const Badge = forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <BaseBadge
        ref={ref}
        {...props}
        badgeContent={props.badgeContent}
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
                "box-border m-0 p-0 text-xs list-none relative inline-block leading-none",
                resolvedSlotProps?.className
              ),
            };
          },
          badge: (ownerState) => {
            const resolvedSlotProps = resolveSlotProps(
              props.slotProps?.badge,
              ownerState
            );
            return {
              ...resolvedSlotProps,
              className: clsx(
                "z-auto absolute flex items-center justify-center top-2 right-2 min-w-[22px] min-h-[22px] font-sans p-0 text-white font-semibold font-xs font-sans rounded-xl bg-secondary leading-5.5 whitespace-nowrap text-center translate-x-1/2 -translate-y-1/2 drop-shadow-lg origin-right",
                resolvedSlotProps?.className,
                props.badgeContent === 0 ? "hidden" : ""
              ),
            };
          },
        }}
      />
    )
  );
});

export default Badge;
