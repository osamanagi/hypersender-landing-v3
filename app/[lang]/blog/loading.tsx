import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-12 md:px-6" aria-busy="true" aria-label="Loading blog">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-12 w-4/5" />
      <Skeleton className="h-6 w-3/5" />
      <Skeleton className="aspect-video w-full" />
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}
