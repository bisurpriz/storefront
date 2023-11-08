import React from "react";

const ProfileFormSkeleton = () => {
  return (
    <div className="p-8 rounded-lg bg-slate-200 animate-pulse flex items-center justify-between w-full">
      {[1, 2].map((_, i) => (
        <div key={i} className="p-4 rounded-lg bg-slate-300 animate-pulse" />
      ))}
    </div>
  );
};

export default ProfileFormSkeleton;
