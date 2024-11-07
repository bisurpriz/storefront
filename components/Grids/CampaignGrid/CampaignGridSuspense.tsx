import React from "react";

const CampaignGridSuspense = () => {
  return (
    <div className="my-2 grid animate-pulse grid-cols-1 gap-1 bg-white md:grid-cols-2 md:gap-4 lg:grid-cols-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-full w-full rounded-lg bg-gray-400 py-32" />
      ))}
    </div>
  );
};

export default CampaignGridSuspense;
