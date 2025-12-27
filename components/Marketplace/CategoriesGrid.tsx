import { ReactNode } from "react";

interface CategoriesGridProps {
    children: ReactNode;
    className?: string;
}

export function CategoriesGrid({
                                   children,
                                   className = "",
                               }: CategoriesGridProps) {
    return (
        <div className={`grid gap-6 ${className}`}>
            {children}
        </div>
    );
}
