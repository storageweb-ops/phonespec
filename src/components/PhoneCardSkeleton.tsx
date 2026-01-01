import { Skeleton } from "@/components/ui/skeleton";

const PhoneCardSkeleton = () => {
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-card">
      <Skeleton className="aspect-[3/4] w-full" />
      <div className="p-4 space-y-3">
        <div>
          <Skeleton className="h-4 w-16 mb-2" />
          <Skeleton className="h-6 w-3/4" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-12 rounded-lg" />
          ))}
        </div>
        <Skeleton className="h-8 w-1/2 mt-2" />
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>
    </div>
  );
};

export default PhoneCardSkeleton;
