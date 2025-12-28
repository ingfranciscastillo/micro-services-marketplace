import { ServiceCardSkeleton } from "./ServiceCardSkeleton";

export function ServicesSkeletonGrid({ count = 12 }: { count?: number }) {
    return (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <ServiceCardSkeleton key={i} />
            ))}
        </div>
    );
}