import React, { useEffect, useState } from "react";

const CountBadge = ({
  children,
  count,
}: {
  children: React.ReactNode;
  count: number;
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative inline-block">
      {children}
      {isClient && (
        <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full absolute -top-2 -right-1">
          {count}
        </span>
      )}
    </div>
  );
};

export default CountBadge;
