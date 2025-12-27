import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CategoryCardSkeleton() {
    return (
        <Card className="h-full">
            <CardContent className="p-6">
                {/* Icon */}
                <Skeleton className="h-12 w-12 rounded-xl mb-4" />

                {/* Title */}
                <Skeleton className="h-4 w-2/3 mb-2" />

                {/* Description */}
                <Skeleton className="h-3 w-full mb-1" />
                <Skeleton className="h-3 w-5/6 mb-3" />

                {/* Services count */}
                <Skeleton className="h-3 w-1/3" />
            </CardContent>
        </Card>
    );
}
