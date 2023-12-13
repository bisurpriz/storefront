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

  const resolveClassName = (className: string, additionalClass?: string) => {
    return clsx(
      "box-border m-0 p-0 text-xs list-none relative inline-block leading-none",
      className,
      additionalClass
    );
  };

  const resolveBadgeClassName = (className: string, badgeContent: number) => {
    return clsx(
      "z-auto absolute flex items-center justify-center top-2 right-2 min-w-[22px] min-h-[22px] font-sans p-0 text-white font-semibold font-xs font-sans rounded-xl bg-secondary leading-5.5 whitespace-nowrap text-center translate-x-1/2 -translate-y-1/2 drop-shadow-lg origin-right",
      className,
      badgeContent === 0 ? "hidden" : ""
    );
  };

  const resolveRootSlotProps = (ownerState: any) => {
    const resolvedSlotProps = resolveSlotProps(
      props.slotProps?.root,
      ownerState
    );
    return {
      ...resolvedSlotProps,
      className: resolveClassName(resolvedSlotProps?.className),
    };
  };

  const resolveBadgeSlotProps = (ownerState: any) => {
    const resolvedSlotProps = resolveSlotProps(
      props.slotProps?.badge,
      ownerState
    );
    return {
      ...resolvedSlotProps,
      className: resolveBadgeClassName(
        resolvedSlotProps?.className,
        props.badgeContent as number
      ),
    };
  };

  return (
    isClient && (
      <BaseBadge
        ref={ref}
        {...props}
        slotProps={{
          ...props.slotProps,
          root: resolveRootSlotProps,
          badge: resolveBadgeSlotProps,
        }}
      />
    )
  );
});

export default Badge;
