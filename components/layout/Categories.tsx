import React from 'react'
import {CategoryCard} from "@/components/marketplace/CategoryCard";
import {
    Bot,
    Mail,
    CreditCard,
    Database,
    Cloud,
    Webhook
} from "lucide-react";

const categories = [
    { name: "AI & Machine Learning", description: "NLP, computer vision, and predictive models", icon: Bot, count: 245, href: "/marketplace?category=ai", color: "#8B5CF6" },
    { name: "Payment Processing", description: "Stripe, PayPal, and crypto integrations", icon: CreditCard, count: 89, href: "/marketplace?category=payments", color: "#10B981" },
    { name: "Email & Messaging", description: "Transactional emails and SMS APIs", icon: Mail, count: 156, href: "/marketplace?category=communication", color: "#F59E0B" },
    { name: "Database & Storage", description: "ORMs, backups, and file storage", icon: Database, count: 178, href: "/marketplace?category=database", color: "#3B82F6" },
    { name: "Cloud Infrastructure", description: "AWS, GCP, and serverless tools", icon: Cloud, count: 134, href: "/marketplace?category=cloud", color: "#EC4899" },
    { name: "Webhooks & APIs", description: "API gateways and webhook handlers", icon: Webhook, count: 112, href: "/marketplace?category=webhooks", color: "#6366F1" },
];

const CategoriesSection = () => {
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
                    <CategoryCard key={category.name} {...category} />
                ))}
            </div>
        </div>
    </section>
    )
}
export default CategoriesSection
