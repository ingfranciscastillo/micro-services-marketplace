import { CategoryCardSkeleton } from "./CategoryCardSkeleton";
import { CategoriesGrid } from "./CategoriesGrid";

export function CategoriesSkeletonGrid({
                                           count = 6,
                                           gridClassName,
                                       }: {
    count?: number;
    gridClassName: string;
}) {
    return (
        <CategoriesGrid className={gridClassName}>
            {Array.from({ length: count }).map((_, i) => (
                <CategoryCardSkeleton key={i} />
            ))}
        </CategoriesGrid>
    );
}
