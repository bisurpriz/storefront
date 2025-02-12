"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type StepProps = {
  label: string;
  value?: number;
  icon?: React.ReactNode;
  path?: string;
};

interface StepperProps {
  activeStep: number;
  steps: StepProps[];
}

export default function Stepper({ activeStep, steps }: StepperProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      role="navigation"
      aria-label="Progress Steps"
      className={clsx([
        "flex justify-between px-3 py-4 md:px-6 md:py-6",
        "rounded-xl bg-background/50",
        "shadow-sm ring-1 ring-border/5",
        "backdrop-blur-sm",
        "w-full max-w-full overflow-x-hidden",
        "relative",
      ])}
    >
      <div className={clsx(["flex w-full items-center", "gap-2 md:gap-4"])}>
        {steps.map((step, index) => {
          const isActive = activeStep === index;
          const isCompleted = activeStep > index;

          return (
            <div
              key={step.value}
              className={clsx([
                "flex flex-1 items-center",
                "select-none transition-all duration-300",
                index === steps.length - 1 ? "flex-initial" : "",
                "min-w-0", // Prevent flex items from growing beyond their content
              ])}
            >
              <div className="flex items-center flex-1 min-w-0 space-x-2 md:space-x-4">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    rotate: isCompleted ? 360 : 0,
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{
                    duration: 0.3,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className={clsx([
                    "relative flex flex-shrink-0 items-center justify-center rounded-full",
                    "ring-[3px] ring-background transition-all duration-300",
                    "shadow-sm",
                    isMobile ? "h-8 w-8" : "h-11 w-11",
                    isActive
                      ? [
                          "bg-primary text-primary-foreground",
                          "ring-primary/20 ring-offset-2",
                          "shadow-lg shadow-primary/20",
                        ]
                      : "",
                    isCompleted
                      ? [
                          "bg-primary/90 text-primary-foreground",
                          "ring-primary/10 ring-offset-1",
                        ]
                      : "",
                    !isActive && !isCompleted
                      ? ["bg-muted text-muted-foreground", "hover:bg-muted/80"]
                      : "",
                  ])}
                >
                  {isCompleted ? (
                    <motion.svg
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className={clsx("h-4 w-4 md:h-5 md:w-5")}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                  ) : (
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="text-xs font-semibold md:text-sm"
                    >
                      {step.icon}
                    </motion.span>
                  )}

                  {isActive && (
                    <motion.div
                      className="absolute rounded-full -inset-1 bg-primary/10 blur-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>

                {(!isMobile || isActive) && (
                  <motion.span
                    initial={false}
                    animate={{
                      color: isActive
                        ? "var(--primary)"
                        : isCompleted
                          ? "var(--primary-80)"
                          : "var(--muted-foreground)",
                    }}
                    className={clsx([
                      "transition-all duration-300",
                      "text-xs font-medium md:text-sm",
                      "truncate",
                      isActive ? "font-semibold" : "",
                      isMobile ? "hidden" : "",
                    ])}
                  >
                    {step.label}
                  </motion.span>
                )}

                {index !== steps.length - 1 && (
                  <motion.div
                    initial={false}
                    animate={{
                      backgroundColor: isCompleted
                        ? "var(--primary)"
                        : "var(--muted)",
                      opacity: isCompleted || isActive ? 1 : 0.3,
                    }}
                    className={clsx([
                      "relative h-[2px] flex-1",
                      "transition-all duration-300",
                      "min-w-[20px] md:min-w-[40px]",
                      "rounded-full",
                      isCompleted ? "bg-primary" : "",
                    ])}
                  >
                    {(isActive || isCompleted) && (
                      <motion.div
                        initial={isActive ? { scaleX: 0 } : { scaleX: 1 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: isActive ? 0.5 : 0,
                          ease: "easeInOut",
                        }}
                        className={clsx([
                          "absolute inset-0 rounded-full",
                          isCompleted ? "bg-primary" : "bg-primary/50",
                        ])}
                      />
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
