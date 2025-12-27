"use client"

import React from 'react'
import {CategoryCard} from "@/components/Marketplace/CategoryCard";
import {useQuery} from "@tanstack/react-query";
import {useTRPC} from "@/trpc/client";
import {IconName} from "lucide-react/dynamic";
import {CategoriesSkeletonGrid} from "@/components/Marketplace/CategoriesSkeletonGrid";
import {CategoriesGrid} from "@/components/Marketplace/CategoriesGrid";

const CategoriesSection = () => {

    const trpc = useTRPC()

    const {data: popularCategories = [], isLoading} = useQuery(trpc.categories.getPopular.queryOptions({
        limit: 6
    }))

    return (
    <section className="py-20 bg-secondary/30">
        <div className="container mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Find the perfect microservice for your stack from our curated collection
                </p>
            </div>

            {isLoading ? (
                <CategoriesSkeletonGrid gridClassName={"sm:grid-cols-2 lg:grid-cols-3"} count={6} />
            ) : (
                <CategoriesGrid className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {popularCategories.map((category) => (
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
                </CategoriesGrid>
            )}
        </div>
    </section>
    )
}
export default CategoriesSection
