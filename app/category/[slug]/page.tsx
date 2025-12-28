"use client"

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useState, useMemo, Fragment } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServiceCard } from "@/components/marketplace/ServiceCard";
import { ServicesSkeletonGrid } from "@/components/Marketplace/ServicesSkeletonGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Search,
    SlidersHorizontal,
    Grid3X3,
    List,
    ArrowLeft,
    Star,
    X
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import { useDebounceValue } from "usehooks-ts";

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

type SortOption = "popular" | "rating" | "newest" | "price-low" | "price-high";

const CategoryDetail = () => {
    const params = useParams();
    const searchParams = useSearchParams();

    // Estados de filtros
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch] = useDebounceValue(searchQuery, 300);
    const [sortBy, setSortBy] = useState<SortOption>("popular");
    const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
    const [minRating, setMinRating] = useState<number>(0);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const trpc = useTRPC();

    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

    // Paginación
    const page = Number(searchParams.get("page") ?? 1);
    const limit = 12;

    // Calcular filtro de precio
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

    // Queries
    const { data: category, isLoading: categoryLoading } = useQuery({
        ...trpc.categories.getBySlug.queryOptions({ slug: slug ?? "" }),
        enabled: !!slug,
    });

    const { data: services, isLoading: servicesLoading, isFetching } = useQuery({
        ...trpc.services.byCategory.queryOptions({
            slug: slug ?? "",
            page,
            limit,
            minPrice: priceFilter.min,
            maxPrice: priceFilter.max,
            minRating: minRating > 0 ? minRating : undefined,
            search: debouncedSearch || undefined,
        }),
        enabled: !!slug,
    });

    // Ordenamiento (solo en cliente, el filtrado es en servidor)
    const sortedServices = useMemo(() => {
        if (!services?.items) return [];

        const result = [...services.items];

        switch (sortBy) {
            case "popular":
                result.sort((a, b) => (b.reviewsCount ?? 0) - (a.reviewsCount ?? 0));
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
    }, [services?.items, sortBy]);

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
        setSelectedPrices([]);
        setMinRating(0);
        setSortBy("popular");
    };

    const hasActiveFilters = searchQuery || selectedPrices.length > 0 || minRating > 0;

    const CategoryIcon = DynamicIcon;

    // Early return si no hay slug
    if (!slug) return null;

    // Componente de filtros
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

    // Category not found
    if (!categoryLoading && !category) {
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

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/categories" className="hover:text-foreground transition-colors">Categories</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                {categoryLoading ? (
                                    <Skeleton className="h-4 w-24" />
                                ) : (
                                    <span className="text-foreground">{category?.name}</span>
                                )}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* Category Header */}
                <div className="my-8">
                    <Link href="/categories" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        All Categories
                    </Link>

                    {categoryLoading ? (
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-16 w-16 rounded-2xl" />
                            <div>
                                <Skeleton className="h-8 w-48 mb-2" />
                                <Skeleton className="h-4 w-72" />
                            </div>
                        </div>
                    ) : category && (
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
                    )}

                    <div className="mt-4">
                        <Badge variant="secondary" className="text-sm">
                            {services?.total ?? 0} services available
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
                                    <SheetContent side="left" className="w-80">
                                        <SheetHeader>
                                            <SheetTitle>Filters</SheetTitle>
                                        </SheetHeader>
                                        <div className="mt-6 px-4">
                                            <FilterContent />
                                        </div>
                                    </SheetContent>
                                </Sheet>

                                <Select
                                    value={sortBy}
                                    onValueChange={(value) => setSortBy(value as SortOption)}
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
                        {(servicesLoading || isFetching) ? (
                            <ServicesSkeletonGrid count={12} />
                        ) : sortedServices.length === 0 ? (
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
                                {sortedServices.map((service) => (
                                    <ServiceCard
                                        key={service.id}
                                        id={service.id}
                                        title={service.title}
                                        description={service.description}
                                        price={service.price}
                                        rating={service.rating ?? undefined}
                                        reviewsCount={service.reviewsCount ?? undefined}
                                        authorName={service.authorName}
                                        authorImage={service.authorImage}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {!isFetching && services && services.totalPages > 1 && (
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
                                        {Array.from({ length: services.totalPages }, (_, i) => i + 1)
                                            .filter(p =>
                                                p === 1 ||
                                                p === services.totalPages ||
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
                                            {page < services.totalPages ? (
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
            </main>

            <Footer />
        </div>
    );
};

export default CategoryDetail;