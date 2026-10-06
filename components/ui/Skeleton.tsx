import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-800/50 rounded-lg",
        className
      )}
      {...props}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-[#0F131C] border border-gray-800 rounded-2xl p-5 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-4 w-20 md:w-24" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <Skeleton className="h-7 md:h-8 w-14 md:w-16 mb-2" />
      <Skeleton className="h-3 w-28 md:w-32" />
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-[#0F131C] border border-gray-800 rounded-2xl p-4 md:p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 space-y-2 min-w-0">
              <Skeleton className="h-5 w-full max-w-[200px] md:max-w-xs" />
              <Skeleton className="h-4 w-full max-w-[120px] md:max-w-[150px]" />
            </div>
            <Skeleton className="h-9 md:h-10 w-20 md:w-24 rounded-full flex-shrink-0" />
          </div>
        </div>
      ))}
    </div>
  );
}
