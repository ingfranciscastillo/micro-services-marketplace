import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Zap, Download } from "lucide-react";

export interface ServiceCardProps {
    id: string;
    name: string;
    description: string;
    price: number;
    rating: number;
    reviews: number;
    downloads: number;
    category: string;
    tags: string[];
    author: {
        name: string;
        avatar?: string;
    };
    featured?: boolean;
}

export function ServiceCard({
                                id,
                                name,
                                description,
                                price,
                                rating,
                                reviews,
                                downloads,
                                category,
                                tags,
                                author,
                                featured,
                            }: ServiceCardProps) {
    return (
        <Link href={`/service/${id}`}>
            <Card className="h-full flex flex-col">
                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <Zap className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold leading-tight">{name}</h3>
                                <p className="text-xs text-muted-foreground">{category}</p>
                            </div>
                        </div>
                        {featured && (
                            <Badge variant="default" className="shrink-0">
                                Featured
                            </Badge>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                            </Badge>
                        ))}
                        {tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                                +{tags.length - 3}
                            </Badge>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="flex-col items-stretch gap-4 border-t pt-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <Star className="h-4 w-4 fill-warning text-warning" />
                            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
                            <span className="text-xs text-muted-foreground">({reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                            <Download className="h-3.5 w-3.5" />
                            <span className="text-xs">{downloads.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                                <AvatarImage src={author.avatar} />
                                <AvatarFallback className="text-xs bg-secondary">
                                    {author.name.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">{author.name}</span>
                        </div>
                        <div className="text-right">
                            {price === 0 ? (
                                <Badge variant="default" color={"green"}>Free</Badge>
                            ) : (
                                <span className="font-semibold">${price}/mo</span>
                            )}
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}
