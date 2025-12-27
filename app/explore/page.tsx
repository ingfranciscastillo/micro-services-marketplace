"use client";
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {ServiceCard} from "@/components/marketplace/ServiceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {Sheet, SheetContent, SheetHeader, SheetTrigger} from "@/components/ui/sheet";
import { Search, SlidersHorizontal, X } from "lucide-react";

import {useQuery} from "@tanstack/react-query";
import {useTRPC} from "@/trpc/client";

const priceRanges = [
    { label: "Free", value: "free" },
    { label: "Under $20", value: "under-20" },
    { label: "$20 - $50", value: "20-50" },
    { label: "Over $50", value: "over-50" },
];

function FilterSidebar({ className }: { className?: string }) {

    const trpc = useTRPC()

    const {data: categories, isLoading: categoryLoading} = useQuery(trpc.categories.getAll.queryOptions())


    if(categoryLoading) {
        return (
            <p>Loading...</p>
        )
    }

    if(!categories) return null

    return (
        <div className={className}>
            <div className="space-y-6">
                {/* Category filter */}
                <div>
                    <h3 className="font-semibold mb-3">Category</h3>
                    <Select defaultValue="All Categories">
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((cat) => (
                                <SelectItem key={cat.id} value={cat.name}>
                                    {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Price filter */}
                <div>
                    <h3 className="font-semibold mb-3">Price Range</h3>
                    <div className="space-y-3">
                        {priceRanges.map((range) => (
                            <div key={range.value} className="flex items-center gap-2">
                                <Checkbox id={range.value} />
                                <label
                                    htmlFor={range.value}
                                    className="text-sm text-muted-foreground cursor-pointer"
                                >
                                    {range.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Rating filter */}
                <div>
                    <h3 className="font-semibold mb-3">Rating</h3>
                    <Select defaultValue="all">
                        <SelectTrigger>
                            <SelectValue placeholder="Minimum rating" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All ratings</SelectItem>
                            <SelectItem value="4.5">4.5+ stars</SelectItem>
                            <SelectItem value="4">4+ stars</SelectItem>
                            <SelectItem value="3.5">3.5+ stars</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Features filter */}
                <div>
                    <h3 className="font-semibold mb-3">Features</h3>
                    <div className="space-y-3">
                        {["REST API", "GraphQL", "TypeScript SDK", "Free tier"].map((feature) => (
                            <div key={feature} className="flex items-center gap-2">
                                <Checkbox id={feature} />
                                <label
                                    htmlFor={feature}
                                    className="text-sm text-muted-foreground cursor-pointer"
                                >
                                    {feature}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <Button variant="outline" className="w-full">
                    <X className="h-4 w-4 mr-2" />
                    Clear filters
                </Button>
            </div>
        </div>
    );
}

export default function Explore() {

    const trpc = useTRPC();

    const [searchQuery, setSearchQuery] = useState("");
    const {data: services, isLoading: servicesLoading} = useQuery(trpc.services.getAll.queryOptions({
        limit: 12,
        offset: 0,
    }))

    if(servicesLoading) {
        return <div>Loading...</div>;
    }

    if(!services) return null;

    // @ts-ignore
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 py-8">
                <div className="container mx-auto relative z-10">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                            Explore Microservices
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Discover production-ready APIs, automations, and developer tools
                        </p>
                    </div>

                    {/* Search and Sort */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                placeholder="Search services..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Select defaultValue="popular">
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="popular">Most Popular</SelectItem>
                                    <SelectItem value="newest">Newest</SelectItem>
                                    <SelectItem value="rating">Highest Rated</SelectItem>
                                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Mobile filter button */}
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" className="lg:hidden">
                                        <SlidersHorizontal className="h-4 w-4" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-80">
                                    <SheetHeader>
                                        <h2 className="font-semibold text-lg mb-6">Filters</h2>
                                    </SheetHeader>
                                    <div className={"px-4"}>
                                        <FilterSidebar />
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>

                    {/* Active filters */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        <Badge variant="secondary" className="gap-1 pr-1">
                            AI/ML
                            <button className="ml-1 hover:bg-muted rounded-full p-0.5">
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                        <Badge variant="secondary" className="gap-1 pr-1">
                            Free
                            <button className="ml-1 hover:bg-muted rounded-full p-0.5">
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    </div>

                    {/* Content */}
                    <div className="flex gap-8">
                        {/* Sidebar - Desktop */}
                        <FilterSidebar className="hidden lg:block w-64 shrink-0" />

                        {/* Grid */}
                        <div className="flex-1">
                            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {services.map((service) => (
                                    <ServiceCard reviewsCount={service.reviewCount} key={service.id} {...service} />
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-center gap-2 mt-12">
                                <Button variant="outline" disabled>
                                    Previous
                                </Button>
                                <Button variant="default">1</Button>
                                <Button variant="outline">2</Button>
                                <Button variant="outline">3</Button>
                                <Button variant="outline">
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
