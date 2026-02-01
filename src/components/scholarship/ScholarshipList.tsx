import { ScholarshipCard } from "./ScholarshipCard";
import { Skeleton } from "@/components/ui/skeleton";
import { GraduationCap } from "lucide-react";
import type { Scholarship } from "@/types/scholarship";

interface ScholarshipListProps {
  scholarships: Scholarship[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

export function ScholarshipList({
  scholarships,
  isLoading,
  error,
}: ScholarshipListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4 rounded-lg border border-border p-6">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
            <div className="grid grid-cols-2 gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-destructive/20 bg-destructive/5 py-16 text-center">
        <p className="text-lg font-medium text-destructive">
          Error loading scholarships
        </p>
        <p className="text-sm text-muted-foreground">{error.message}</p>
      </div>
    );
  }

  if (!scholarships || scholarships.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-muted/30 py-16 text-center">
        <GraduationCap className="mb-4 h-12 w-12 text-muted-foreground" />
        <p className="text-lg font-medium">No scholarships found</p>
        <p className="text-sm text-muted-foreground">
          Try adjusting your search filters
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Found <span className="font-semibold text-foreground">{scholarships.length}</span>{" "}
        scholarship{scholarships.length !== 1 && "s"}
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {scholarships.map((scholarship) => (
          <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
        ))}
      </div>
    </div>
  );
}
