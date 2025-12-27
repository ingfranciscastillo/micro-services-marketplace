"use client"

import Link from "next/link";
import {useParams} from "next/navigation";
import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServiceCard } from "@/components/marketplace/ServiceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    SlidersHorizontal,
    Grid3X3,
    List,
    ArrowLeft,
    Bot,
    Star,
    X
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const priceRanges = [
    { value: "free", label: "Free", min: 0, max: 0 },
    { value: "0-25", label: "$0 – $25", min: 0, max: 25 },
    { value: "25-50", label: "$25 – $50", min: 25, max: 50 },
    { value: "50-100", label: "$50 – $100", min: 50, max: 100 },
    { value: "100+", label: "$100+", min: 100, max: Infinity },
];

const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
];

const CategoryDetail = () => {
    const params = useParams();
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<
        "popular" | "rating" | "newest" | "price-low" | "price-high"
    >("popular");
    const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
    const [minRating, setMinRating] = useState<number>(0);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const trpc = useTRPC();

    const slug = Array.isArray(params.slug)
        ? params.slug[0]
        : params.slug;

    if (!slug) return null;

    const { data: category, isLoading: categoryLoading } =
        useQuery(trpc.categories.getBySlug.queryOptions({ slug }));

    const { data: services = [], isLoading: servicesLoading } =
        useQuery(trpc.services.byCategory.queryOptions({ slug }));

    const CategoryIcon = DynamicIcon;

    // Filter services
    const filteredServices = useMemo(() => {
        let result = [...services];

        // 🔍 Search
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                s =>
                    s.title.toLowerCase().includes(q) ||
                    s.description.toLowerCase().includes(q)
            );
        }

        // 💰 Price
        if (selectedPrices.length > 0) {
            result = result.filter(service =>
                selectedPrices.some(value => {
                    const range = priceRanges.find(r => r.value === value);
                    if (!range) return false;
                    return service.price >= range.min && service.price <= range.max;
                })
            );
        }

        // ⭐ Rating
        if (minRating > 0) {
            result = result.filter(s => s.rating >= minRating);
        }

        // 🔃 Sort
        switch (sortBy) {
            case "popular":
                result.sort((a, b) => b.reviewsCount - a.reviewsCount);
                break;

            case "rating":
                result.sort((a, b) => b.rating - a.rating);
                break;

            case "newest":
                result.sort(
                    (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                );
                break;

            case "price-low":
                result.sort((a, b) => a.price - b.price);
                break;

            case "price-high":
                result.sort((a, b) => b.price - a.price);
                break;
        }

        return result;
    }, [services, searchQuery, selectedPrices, minRating, sortBy]);

    const togglePriceFilter = (value: string) => {
        setSelectedPrices(prev =>
            prev.includes(value)
                ? prev.filter(p => p !== value)
                : [...prev, value]
        );
    };

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedPrices([]);
        setMinRating(0);
        setSortBy("popular");
    };

    const hasActiveFilters = searchQuery || selectedPrices.length > 0 || minRating > 0;

    if (categoryLoading || servicesLoading) {
        return <div>Loading...</div>;
    }

    if (!category) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <main className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-2xl font-bold mb-4">Category not found</h1>
                    <Link href="/categories">
                        <Button>Back to Categories</Button>
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    const FilterContent = () => (
        <div className="space-y-6">
            {/* Price filter */}
            <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="space-y-3">
                    {priceRanges.map((range) => (
                        <div key={range.value} className="flex items-center gap-2">
                            <Checkbox
                                id={range.value}
                                checked={selectedPrices.includes(range.value)}
                                onClick={() => togglePriceFilter(range.value)}
                            />
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
                <h3 className="font-semibold mb-3">Minimum Rating</h3>
                <Select value={minRating.toString()} onValueChange={(v) => setMinRating(parseFloat(v))}>
                    <SelectTrigger>
                        <SelectValue placeholder="All ratings" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="0">All ratings</SelectItem>
                        <SelectItem value="4">4+ stars</SelectItem>
                        <SelectItem value="4.5">4.5+ stars</SelectItem>
                        <SelectItem value="4.8">4.8+ stars</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Clear filters */}
            {hasActiveFilters && (
                <Button variant="outline" className="w-full" onClick={clearFilters}>
                    <X className="h-4 w-4 mr-2" />
                    Clear all filters
                </Button>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/categories" className="hover:text-foreground transition-colors">Categories</Link>
                    <span>/</span>
                    <span className="text-foreground">{category.name}</span>
                </div>

                {/* Category Header */}
                <div className="mb-8">
                    <Link href="/categories" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        All Categories
                    </Link>
                    <div className="flex items-center gap-4">
                        <div
                            className="p-4 rounded-2xl"
                            style={{ backgroundColor: `${category.color}20` }}
                        >
                            <CategoryIcon
                                name={category.icon as IconName}
                                className="h-8 w-8"
                                style={{ color: category.color }}
                            />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">{category.name}</h1>
                            <p className="text-muted-foreground mt-1">{category.description}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Badge variant="secondary" className="text-sm">
                            {filteredServices.length} services available
                        </Badge>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-64 shrink-0">
                        <div className="sticky top-24 bg-card rounded-xl border p-6">
                            <h2 className="font-semibold text-lg mb-4">Filters</h2>
                            <FilterContent />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Search and Sort Bar */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search services..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>

                            <div className="flex gap-2">
                                {/* Mobile Filter Button */}
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="outline" className="lg:hidden">
                                            <SlidersHorizontal className="h-4 w-4 mr-2" />
                                            Filters
                                            {hasActiveFilters && (
                                                <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                                                    !
                                                </Badge>
                                            )}
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="left">
                                        <SheetHeader>
                                            <SheetTitle>Filters</SheetTitle>
                                        </SheetHeader>
                                        <div className="mt-6">
                                            <FilterContent />
                                        </div>
                                    </SheetContent>
                                </Sheet>

                                <Select
                                    value={sortBy}
                                    onValueChange={(value) =>
                                        setSortBy(value as "popular" | "rating" | "newest" | "price-low" | "price-high")
                                    }
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {sortOptions.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>


                                <div className="hidden sm:flex border rounded-lg">
                                    <Button
                                        variant={viewMode === "grid" ? "secondary" : "ghost"}
                                        size="icon"
                                        onClick={() => setViewMode("grid")}
                                        className="rounded-r-none"
                                    >
                                        <Grid3X3 className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant={viewMode === "list" ? "secondary" : "ghost"}
                                        size="icon"
                                        onClick={() => setViewMode("list")}
                                        className="rounded-l-none"
                                    >
                                        <List className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Active Filters */}
                        {hasActiveFilters && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {searchQuery && (
                                    <Badge variant="secondary" className="flex items-center gap-1">
                                        Search: {searchQuery}
                                        <button onClick={() => setSearchQuery("")}>
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                )}
                                {selectedPrices.map(price => (
                                    <Badge key={price} variant="secondary" className="flex items-center gap-1">
                                        {priceRanges.find(r => r.value === price)?.label}
                                        <button onClick={() => togglePriceFilter(price)}>
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                ))}
                                {minRating > 0 && (
                                    <Badge variant="secondary" className="flex items-center gap-1">
                                        <Star className="h-3 w-3" /> {minRating}+
                                        <button onClick={() => setMinRating(0)}>
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                )}
                            </div>
                        )}

                        {/* Services Grid/List */}
                        {filteredServices.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground mb-4">No services found matching your criteria.</p>
                                <Button variant="outline" onClick={clearFilters}>
                                    Clear all filters
                                </Button>
                            </div>
                        ) : (
                            <div className={
                                viewMode === "grid"
                                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                                    : "flex flex-col gap-4"
                            }>
                                {filteredServices.map((service) => (
                                    <ServiceCard key={service.id} {...service} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CategoryDetail;
