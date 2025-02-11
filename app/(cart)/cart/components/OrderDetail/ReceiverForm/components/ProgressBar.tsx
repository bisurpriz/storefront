import { STEPPER_DATA } from "../constants";

interface ProgressBarProps {
  step: number;
}

export function ProgressBar({ step }: ProgressBarProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {STEPPER_DATA.map((data, i) => (
          <div
            key={data.key}
            className={`flex w-1/2 select-none justify-center gap-1 text-center text-sm lg:text-base ${
              i < step ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {data.label}
          </div>
        ))}
      </div>
      <div className="w-full h-2 mt-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full transition-all duration-300 ease-in-out bg-primary"
          style={{ width: `${(step / 2) * 100}%` }}
        />
      </div>
    </div>
  );
}
