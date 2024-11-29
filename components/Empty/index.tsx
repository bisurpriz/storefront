import { ReactNode } from "react";

interface EmptyProps {
  title: string | ReactNode;
  description: string | ReactNode;
}

const Empty = ({ title, description }: EmptyProps) => {
  return (
    <div className="h-full flex-1 overflow-auto px-2">
      <div className="flex h-full flex-col items-center justify-center">
        <div className="text-2xl font-bold">{title}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
    </div>
  );
};

export default Empty;
