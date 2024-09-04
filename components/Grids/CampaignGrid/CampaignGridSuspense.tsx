import React from "react";

const CampaignGridSuspense = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1 md:gap-4 my-2 animate-pulse bg-white">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="w-full h-full bg-gray-400 rounded-lg py-32" />
      ))}
    </div>
  );
};

export default CampaignGridSuspense;
