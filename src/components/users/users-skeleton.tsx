"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function UsersSkeleton() {
  return (
    <Card className="p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-9 w-40" />
        </div>

        <div className="hidden md:block">
          <div className="grid grid-cols-12 gap-2 border-b pb-3 text-xs text-muted-foreground">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
          <div className="mt-3 flex flex-col gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="grid grid-cols-12 gap-2">
                {Array.from({ length: 8 }).map((__, j) => (
                  <Skeleton key={j} className="h-5 w-full" />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3 md:hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="mt-2 h-3 w-56" />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
}

