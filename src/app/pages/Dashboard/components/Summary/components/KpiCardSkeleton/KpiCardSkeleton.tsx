const SkeletonBlock = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 
      bg-[length:200%_100%] animate-shimmer rounded-md ${className}`}
    />
  );
};

const KpiCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100">
      {/* Top row */}
      <div className="flex items-center justify-between">
        <SkeletonBlock className="h-4 w-24" />
        <SkeletonBlock className="h-8 w-8 rounded-lg" />
      </div>

      {/* Value */}
      <div className="mt-4">
        <SkeletonBlock className="h-7 w-20" />
      </div>

      {/* Change */}
      <div className="mt-3 flex items-center gap-2">
        <SkeletonBlock className="h-4 w-4 rounded-full" />
        <SkeletonBlock className="h-4 w-12" />
        <SkeletonBlock className="h-4 w-20" />
      </div>
    </div>
  );
};

export default KpiCardSkeleton;
