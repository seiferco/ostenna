export function ListingCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/5] rounded-xl bg-patina-sand/40" />
      <div className="mt-3 space-y-2">
        <div className="flex items-center gap-1.5">
          <div className="h-5 w-5 rounded-full bg-patina-sand/40" />
          <div className="h-3 w-16 rounded bg-patina-sand/40" />
        </div>
        <div className="h-4 w-3/4 rounded bg-patina-sand/40" />
        <div className="h-5 w-1/3 rounded bg-patina-sand/40" />
        <div className="h-3 w-1/2 rounded bg-patina-sand/40" />
      </div>
    </div>
  );
}
