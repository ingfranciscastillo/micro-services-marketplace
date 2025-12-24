import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
    name: string;
    description: string;
    icon: LucideIcon;
    count: number;
    href: string;
    color: string;
}

export function CategoryCard({
                                 name,
                                 description,
                                 icon: Icon,
                                 count,
                                 href,
                                 color,
                             }: CategoryCardProps) {
    return (
        <Link href={href}>
            <Card className="h-full">
                <CardContent className="p-6">
                    <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl mb-4"
                        style={{ backgroundColor: `${color}15` }}
                    >
                        <Icon className="h-6 w-6" style={{ color }} />
                    </div>
                    <h3 className="font-semibold mb-1">{name}</h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {count} services available
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
}
