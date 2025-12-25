import { Star, Clock, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";

interface ServiceCardProps {
    avatar: string;
    name: string;
    badge: string;
    badgeColor: string;
    title: string;
    rating: number;
    reviews: number;
    deliveryTime: string;
    price: number;
    delay: number;
    isVisible: boolean;
    mousePosition: { x: number; y: number };
}

export default function ServiceCard({
                                        avatar,
                                        name,
                                        badge,
                                        badgeColor,
                                        title,
                                        rating,
                                        reviews,
                                        deliveryTime,
                                        price,
                                        delay,
                                    }: ServiceCardProps) {
    const [floatOffset, setFloatOffset] = useState(0);

    // Continuous floating animation
    useEffect(() => {
        let animationFrame: number;
        let startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const offset = Math.sin(elapsed / 2000 + delay / 100) * 5;
            setFloatOffset(offset);
            animationFrame = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(animationFrame);
    }, [delay]);

    return (
        <div
            className="w-[280px] md:w-[340px] transition-transform duration-200"
            style={{
                transform: `translateY(${floatOffset}px)`,
            }}
        >
            <Card className="backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
                {/* Header */}
                <CardHeader>
                    <Avatar className={"size-14"}>
                        <AvatarImage
                            src={avatar}
                            alt={name}
                        />
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <CardTitle className="font-semibold text-base truncate">{name}</CardTitle>
                        <Badge className={`${badgeColor}`}>
                            {badge === 'Top Rated' ? (
                                <span>⭐</span>
                            ) : (
                                <Check className="size-3" />
                            )}
                            {badge}
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent>
                    <CardTitle className={"mb-2"}>
                        {title}
                    </CardTitle>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-sm mb-4">
                        <div className="flex items-center gap-1.5">
                            <Star className="size-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{rating}</span>
                            <span className="text-secondary-foreground">({reviews.toLocaleString()})</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="size-4 text-secondary-foreground" />
                            <span>{deliveryTime}</span>
                        </div>
                    </div>

                    {/* Price */}
                    <Separator className={"my-4"} />
                    <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-wide font-medium">Desde</span>
                        <span className="text-3xl font-bold">${price}</span>
                    </div>

                </CardContent>

            </Card>
        </div>
    );
}
