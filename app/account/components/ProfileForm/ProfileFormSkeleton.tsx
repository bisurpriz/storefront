const ProfileFormSkeleton = () => {
  return (
    <div className="flex w-full animate-pulse flex-col items-center justify-between gap-8 rounded-lg bg-slate-200 p-8">
      {[1, 2].map((_, i) => (
        <div
          key={i}
          className="w-full animate-pulse rounded-lg bg-slate-300 p-4"
        />
      ))}
    </div>
  );
};

export default ProfileFormSkeleton;
