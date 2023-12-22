"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback, useEffect } from "react";
import { clsx } from "clsx";
import { AiOutlineClose } from "react-icons/ai";
import { useLockScroll } from "@/hooks/useLockScroll";
import { usePathname } from "next/navigation";

const isOpenClassNames = {
  right: "translate-x-0",
  left: "translate-x-0",
  top: "translate-y-0",
  bottom: "translate-y-0",
};

const closeClassNames = {
  right: "translate-x-full",
  left: "-translate-x-full",
  top: "-translate-y-full",
  bottom: "translate-y-full",
};

const classNames = {
  right: "inset-y-0 right-0",
  left: "inset-y-0 left-0",
  top: "inset-x-0 top-0",
  bottom: "inset-x-0 bottom-0",
};

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  placement = "right",
  children,
  title,
  lockScroll = false,
}) => {
  useLockScroll({ bool: lockScroll && !isOpen });
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      onClose?.();
    }
  }, [pathname]);

  const handleEsc = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    },
    [onClose]
  );

  const handleResize = useCallback(() => {
    if (window.innerWidth > 640) {
      onClose?.();
    }
  }, [onClose]);

  useEffect(() => {
    window.addEventListener("keydown", handleEsc);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleEsc, handleResize]);

  return (
    <div
      id={`dialog-${placement}`}
      className="relative z-10"
      aria-labelledby="slide-over"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className={clsx(
          "fixed inset-0 bg-gray-500 bg-opacity-75 transition-all",
          {
            "opacity-100 duration-500 ease-in-out visible": isOpen,
          },
          { "opacity-0 duration-500 ease-in-out invisible": !isOpen }
        )}
      />
      <div className={clsx({ "fixed inset-0 overflow-hidden": isOpen })}>
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={clsx(
              "pointer-events-none fixed max-w-full max-sm:min-w-full max-md:min-w-[300px]",
              classNames[placement]
            )}
          >
            <div
              className={clsx(
                "pointer-events-auto relative w-full h-full transform transition ease-in-out duration-500",
                { [closeClassNames[placement]]: !isOpen },
                { [isOpenClassNames[placement]]: isOpen }
              )}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              <div
                className={clsx(
                  "flex flex-col h-full overflow-y-auto p-4 shadow-xl bg-white md:min-w-[300px] max-sm:min-w-full rounded-none",
                  { "rounded-l-lg": placement === "right" },
                  { "rounded-r-lg": placement === "left" },
                  { "rounded-b-lg": placement === "top" },
                  { "rounded-t-lg": placement === "bottom" }
                )}
              >
                <div
                  className={clsx(
                    "relative flex items-center justify-between ",
                    {
                      "mb-4": title,
                    }
                  )}
                >
                  {title && <h3 className="text-lg font-semibold">{title}</h3>}
                  <button
                    className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                    onClick={onClose}
                  >
                    <AiOutlineClose size={24} />
                  </button>
                </div>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Drawer);
