"use client";

import clsx from "clsx";

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
    <div className={clsx(["flex justify-between space-x-4 py-4"])}>
      {steps.map((step, index) => {
        return (
          <div
            key={step.value}
            className={clsx([
              `flex items-center space-x-4 w-full`,
              "transition-all duration-500 ease-in-out pointer-events-none select-none",
              index === steps.length - 1 ? "justify-content !w-fit" : "",
            ])}
          >
            <div
              key={step.label}
              className={clsx([
                `flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0`,
                activeStep === index ? "bg-primary-300" : "bg-gray-200",
                activeStep > index ? "bg-primary-500" : "bg-gray-200",
              ])}
            >
              <span
                className={clsx([
                  "text-lg font-bold",
                  activeStep > index ? "text-white" : "text-gray-500",
                  activeStep === index ? "text-white" : "text-gray-500",
                ])}
              >
                {step.icon}
              </span>
            </div>
            <span
              className={clsx([
                "text-base font-medium",
                activeStep > index ? "text-primary-500" : "text-gray-500",
                activeStep === index ? "text-primary-300" : "text-gray-500",
                "max-md:hidden",
              ])}
            >
              {step.label}
            </span>
            <div
              className={clsx([
                "flex-1 h-0.5",
                index === steps.length - 1 ? "hidden" : "block",
                activeStep > index ? "bg-primary-500" : "bg-gray-200",
              ])}
            />
          </div>
        );
      })}
    </div>
  );
}
