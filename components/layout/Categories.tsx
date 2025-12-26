"use client"

import React from 'react'
import {CategoryCard} from "@/components/Marketplace/CategoryCard";
import {useQuery} from "@tanstack/react-query";
import {useTRPC} from "@/trpc/client";

const CategoriesSection = () => {

    const trpc = useTRPC()

    const {data: categories, isLoading} = useQuery(trpc.categories.getAll.queryOptions())

    if(isLoading) {
        return (
            <p>Loading...</p>
        )
    }

    if(!categories) return null

    return (
    <section className="py-20 bg-secondary/30">
        <div className="container mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Find the perfect microservice for your stack from our curated collection
                </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <CategoryCard serviceCount={category.servicesCount} key={category.name} {...category} />
                ))}
            </div>
        </div>
    </section>
    )
}
export default CategoriesSection
