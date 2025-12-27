import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { DynamicIcon, IconName } from "lucide-react/dynamic";

interface CategoryCardProps {
  name: string;
  slug: string;
  description: string;
  icon: IconName;
  serviceCount: number;
  color: string;
}

export function CategoryCard({
  name,
  slug,
  description,
  icon,
  serviceCount,
  color,
}: CategoryCardProps) {
  return (
    <Link href={`/category/${slug}`} passHref className={"hover:-translate-y-2 transition duration-300"}>
      <Card className="h-full">
        <CardContent className="p-6">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl mb-4"
            style={{ backgroundColor: `${color}15` }}
          >
            <DynamicIcon name={`${icon}`} className="h-6 w-6" style={{ color }} />
          </div>
          <h3 className="font-semibold mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
            {description}
          </p>
          <p className="text-xs text-muted-foreground">
            {serviceCount} services available
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
