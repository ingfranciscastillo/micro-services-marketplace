"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CategoryCard } from "@/components/Marketplace/CategoryCard";

import { Input } from "@/components/ui/input";
import {
    Search,
} from "lucide-react";
import {IconName} from "lucide-react/dynamic"
import { useState } from "react";
import {useQuery} from "@tanstack/react-query";
import {useTRPC} from "@/trpc/client";
import {CategoriesSkeletonGrid} from "@/components/Marketplace/CategoriesSkeletonGrid";

const Categories = () => {

    const [searchQuery, setSearchQuery] = useState("");

    const trpc = useTRPC();
    const {data: categories = [], isLoading} = useQuery(trpc.categories.getAll.queryOptions())
    const { data: servicesCount = 0 } = useQuery(
        trpc.services.count.queryOptions()
    );

    const filteredCategories = categories.filter(
        (category) =>
            category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            category.description
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="gradient-hero py-16 lg:py-24">
                    <div className="container text-center mx-auto z-10 relative">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Browse Categories
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                            Explore our curated collection of {servicesCount}+ microservices across{" "}
                            {categories.length} categories
                        </p>

                        {/* Search */}
                        <div className="relative max-w-md mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                placeholder="Search categories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 h-12 text-base rounded-xl border-2 focus:border-primary"
                            />
                        </div>
                    </div>
                </section>

                {/* Categories Grid */}
                <section className="py-16">
                    <div className="container mx-auto z-10 relative">
                        {isLoading ? (
                            <CategoriesSkeletonGrid
                                count={12}
                                gridClassName="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                            />
                        ) : filteredCategories.length > 0 ? (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredCategories.map((category) => (
                                    <CategoryCard
                                        key={category.id}
                                        name={category.name}
                                        slug={category.slug}
                                        description={category.description}
                                        color={category.color}
                                        serviceCount={category.servicesCount}
                                        icon={category.icon as IconName}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground text-lg">
                                    No categories found for "{searchQuery}"
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Categories;
