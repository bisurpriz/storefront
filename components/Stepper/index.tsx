"use client";

import clsx from "clsx";
import { motion } from "framer-motion";

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
  return (
    <div
      className={clsx([
        "flex justify-between space-x-4 py-4",
        "rounded-md bg-background/50 px-4",
      ])}
    >
      {steps.map((step, index) => {
        const isActive = activeStep === index;
        const isCompleted = activeStep > index;

        return (
          <div
            key={step.value}
            className={clsx([
              "flex w-full items-center space-x-4",
              "pointer-events-none select-none transition-all duration-300",
              index === steps.length - 1 ? "justify-content !w-fit" : "",
            ])}
          >
            <motion.div
              initial={false}
              animate={{
                scale: isActive ? 1.05 : 1,
              }}
              transition={{ duration: 0.2 }}
              className={clsx([
                "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full",
                "ring-[3px] ring-background transition-colors duration-200",
                isActive ? "bg-primary text-primary-foreground" : "",
                isCompleted ? "bg-primary/90 text-primary-foreground" : "",
                !isActive && !isCompleted
                  ? "bg-muted text-muted-foreground"
                  : "",
              ])}
            >
              {isCompleted ? (
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="h-4 w-4"
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
                <span className="text-sm font-semibold">{step.icon}</span>
              )}
            </motion.div>

            <span
              className={clsx([
                "text-sm font-medium transition-colors duration-200",
                isActive ? "text-primary" : "",
                isCompleted ? "text-primary/80" : "",
                !isActive && !isCompleted ? "text-muted-foreground" : "",
                "max-md:text-xs",
              ])}
            >
              {step.label}
            </span>

            {index !== steps.length - 1 && (
              <div
                className={clsx([
                  "h-[2px] flex-1 rounded-full transition-colors duration-200",
                  isCompleted ? "bg-primary/60" : "bg-muted",
                ])}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
