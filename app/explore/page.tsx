"use client";

import { useState, useMemo, Fragment } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServiceCard } from "@/components/marketplace/ServiceCard";
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
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Search, SlidersHorizontal, Star, X } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import {useDebounceValue} from "usehooks-ts";

import { ServicesSkeletonGrid } from "@/components/Marketplace/ServicesSkeletonGrid";
import {Skeleton} from "@/components/ui/skeleton";

const priceRanges = [
    { value: "free", label: "Free", min: 0, max: 0 },
    { value: "0-20", label: "Under $20", min: 0, max: 20 },
    { value: "20-50", label: "$20 - $50", min: 20, max: 50 },
    { value: "50+", label: "Over $50", min: 50, max: Infinity },
];

const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
];

type SortOption = "popular" | "rating" | "newest" | "price-low" | "price-high";

export default function Explore() {
    const trpc = useTRPC();
    const searchParams = useSearchParams();

    // Estados de filtros
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch] = useDebounceValue(searchQuery, 300);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
    const [minRating, setMinRating] = useState<number>(0);
    const [sortBy, setSortBy] = useState<SortOption>("popular");

    const priceFilter = useMemo(() => {
        if (selectedPrices.length === 0) return { min: undefined, max: undefined };

        let min = Infinity;
        let max = -Infinity;

        selectedPrices.forEach(value => {
            const range = priceRanges.find(r => r.value === value);
            if (range) {
                if (value === "free") {
                    min = 0;
                    max = 0;
                } else {
                    min = Math.min(min, range.min);
                    max = Math.max(max, range.max === Infinity ? 999999 : range.max);
                }
            }
        });

        return {
            min: min === Infinity ? undefined : min,
            max: max === -Infinity ? undefined : (max === 999999 ? undefined : max),
        };
    }, [selectedPrices]);

    // Paginación
    const page = Number(searchParams.get("page") ?? 1);

    // Queries
    const { data: categories, isLoading: categoriesLoading } = useQuery(
        trpc.categories.getAll.queryOptions()
    );

    const { data: servicesData, isLoading: servicesLoading, isFetching } = useQuery(
        trpc.services.getAll.queryOptions({
            page,
            limit: 12,
            categoryId: selectedCategory !== "all" ? selectedCategory : undefined,
            minPrice: priceFilter.min,
            maxPrice: priceFilter.max,
            minRating: minRating > 0 ? minRating : undefined,
            search: debouncedSearch || undefined,
        })
    );

    // Filtrado y ordenamiento
    const sortedServices = useMemo(() => {
        if (!servicesData?.items) return [];

        let result = [...servicesData.items];

        switch (sortBy) {
            case "popular":
                result.sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));
                break;
            case "rating":
                result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
                break;
            case "newest":
                // Ya viene ordenado por fecha del servidor
                break;
            case "price-low":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price-high":
                result.sort((a, b) => b.price - a.price);
                break;
        }

        return result;
    }, [servicesData?.items, sortBy]);
    // Handlers
    const togglePriceFilter = (value: string) => {
        setSelectedPrices(prev =>
            prev.includes(value)
                ? prev.filter(p => p !== value)
                : [...prev, value]
        );
    };

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedCategory("all");
        setSelectedPrices([]);
        setMinRating(0);
        setSortBy("popular");
    };

    const hasActiveFilters =
        searchQuery ||
        (selectedCategory && selectedCategory !== "all") ||
        selectedPrices.length > 0 ||
        minRating > 0;

    // Componente de filtros reutilizable
    const FilterContent = () => (
        <div className="space-y-6">
            {/* Category filter */}
            <div>
                <h3 className="font-semibold mb-3">Category</h3>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All categories</SelectItem>
                        {categories?.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
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
                            <Checkbox
                                id={range.value}
                                checked={selectedPrices.includes(range.value)}
                                onCheckedChange={() => togglePriceFilter(range.value)}
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
                <Select
                    value={minRating.toString()}
                    onValueChange={(v) => setMinRating(parseFloat(v))}
                >
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
                            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                                <SelectTrigger className="w-40">
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

                            {/* Mobile filter button */}
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" className="lg:hidden">
                                        <SlidersHorizontal className="h-4 w-4" />
                                        {hasActiveFilters && (
                                            <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                                                !
                                            </Badge>
                                        )}
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-80">
                                    <SheetHeader>
                                        <SheetTitle>Filters</SheetTitle>
                                    </SheetHeader>
                                    <div className="mt-6 px-4">
                                        <FilterContent />
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>

                    {/* Active filters */}
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
                            {selectedCategory && selectedCategory !== "all" && (
                                <Badge variant="secondary" className="flex items-center gap-1">
                                    {categories?.find(c => c.id === selectedCategory)?.name}
                                    <button onClick={() => setSelectedCategory("all")}>
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

                    {/* Content */}
                    <div className="flex gap-8">
                        {/* Sidebar - Desktop */}
                        <aside className="hidden lg:block w-64 shrink-0">
                            <div className="sticky top-24 bg-card rounded-xl border p-6">
                                <h2 className="font-semibold text-lg mb-4">Filters</h2>
                                {categoriesLoading ? (
                                    <div className="space-y-4">
                                        <Skeleton className="h-10 w-full" />
                                        <Skeleton className="h-10 w-full" />
                                        <Skeleton className="h-10 w-full" />
                                    </div>
                                ) : (
                                    <FilterContent />
                                )}
                            </div>
                        </aside>

                        <div className="flex-1">
                            {isFetching ? (
                                // Skeleton mientras carga
                                <ServicesSkeletonGrid count={12} />
                            ) : sortedServices.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-muted-foreground mb-4">
                                        No services found matching your criteria.
                                    </p>
                                    <Button variant="outline" onClick={clearFilters}>
                                        Clear all filters
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-4">
                                        <Badge variant="secondary">
                                            {servicesData?.total ?? 0} services found
                                        </Badge>
                                    </div>
                                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {sortedServices.map((service) => (
                                            <ServiceCard
                                                key={service.id}
                                                id={service.id}
                                                title={service.title}
                                                description={service.description}
                                                price={service.price}
                                                rating={service.rating ?? undefined}
                                                reviewsCount={service.reviewCount ?? undefined}
                                                authorName={service.authorName}
                                                authorImage={service.authorImage}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Pagination - solo mostrar cuando no está cargando */}
                            {!isFetching && servicesData && servicesData.totalPages > 1 && (
                                <div className="flex justify-center gap-2 mt-12">
                                    <Pagination>
                                        <PaginationContent>
                                            {/* Previous */}
                                            <PaginationItem>
                                                {page > 1 ? (
                                                    <PaginationPrevious href={`?page=${page - 1}`} />
                                                ) : (
                                                    <PaginationPrevious
                                                        href="#"
                                                        className="pointer-events-none opacity-50"
                                                    />
                                                )}
                                            </PaginationItem>

                                            {/* Page numbers */}
                                            {Array.from({ length: servicesData.totalPages }, (_, i) => i + 1)
                                                .filter(p =>
                                                    p === 1 ||
                                                    p === servicesData.totalPages ||
                                                    Math.abs(p - page) <= 1
                                                )
                                                .map((p, idx, arr) => (
                                                    <Fragment key={p}>
                                                        {idx > 0 && p - arr[idx - 1] > 1 && (
                                                            <PaginationItem>
                                                                <span className="px-3 py-2">...</span>
                                                            </PaginationItem>
                                                        )}
                                                        <PaginationItem>
                                                            <PaginationLink
                                                                href={`?page=${p}`}
                                                                isActive={p === page}
                                                            >
                                                                {p}
                                                            </PaginationLink>
                                                        </PaginationItem>
                                                    </Fragment>
                                                ))}

                                            {/* Next */}
                                            <PaginationItem>
                                                {page < servicesData.totalPages ? (
                                                    <PaginationNext href={`?page=${page + 1}`} />
                                                ) : (
                                                    <PaginationNext
                                                        href="#"
                                                        className="pointer-events-none opacity-50"
                                                    />
                                                )}
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}