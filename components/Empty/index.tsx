import { ReactNode } from 'react';

interface EmptyProps {
  title: string | ReactNode;
  description: string | ReactNode;
}

const Empty = ({ title, description }: EmptyProps) => {
  return (
    <div className="flex-1 h-full overflow-auto px-2">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-2xl font-bold">{title}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
    </div>
  );
};

export default Empty;
