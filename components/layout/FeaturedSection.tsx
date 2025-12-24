import React from 'react'
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";
import {ServiceCard} from "@/components/marketplace/ServiceCard";

const featuredServices = [
    {
        id: "1",
        name: "AI Text Analyzer",
        description: "Advanced NLP service for sentiment analysis, entity extraction, and text classification.",
        price: 29,
        rating: 4.9,
        reviews: 234,
        downloads: 12500,
        category: "AI/ML",
        tags: ["NLP", "Sentiment", "REST API"],
        author: { name: "AILabs" },
        featured: true,
    },
    {
        id: "2",
        name: "Email Service Pro",
        description: "Reliable transactional email API with templates, analytics, and high deliverability.",
        price: 19,
        rating: 4.8,
        reviews: 567,
        downloads: 45000,
        category: "Communication",
        tags: ["Email", "SMTP", "Templates"],
        author: { name: "MailForge" },
    },
    {
        id: "3",
        name: "Stripe Payment Gateway",
        description: "Pre-built payment flow with subscriptions, invoicing, and webhook handling.",
        price: 0,
        rating: 4.9,
        reviews: 892,
        downloads: 78000,
        category: "Payments",
        tags: ["Stripe", "Payments", "Subscriptions"],
        author: { name: "PayStack" },
        featured: true,
    },
    {
        id: "4",
        name: "Image Optimizer API",
        description: "Compress, resize, and convert images on-the-fly with WebP and AVIF support.",
        price: 15,
        rating: 4.7,
        reviews: 189,
        downloads: 23000,
        category: "Media",
        tags: ["Images", "CDN", "Optimization"],
        author: { name: "MediaFlow" },
    },
    {
        id: "5",
        name: "Auth0 Wrapper",
        description: "Simplified authentication with SSO, MFA, and social login built-in.",
        price: 39,
        rating: 4.8,
        reviews: 456,
        downloads: 34000,
        category: "Authentication",
        tags: ["Auth", "SSO", "OAuth"],
        author: { name: "SecureID" },
    },
    {
        id: "6",
        name: "Database Backup Bot",
        description: "Automated backups for PostgreSQL, MySQL, and MongoDB with S3 integration.",
        price: 12,
        rating: 4.6,
        reviews: 123,
        downloads: 8900,
        category: "DevOps",
        tags: ["Backup", "Database", "Automation"],
        author: { name: "DevTools Co" },
    },
];

const FeaturedSection = () => {
    return (
    <section className="py-20">
        <div className="container mx-auto relative z-10">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Microservices</h2>
                    <p className="text-muted-foreground text-lg">
                        Handpicked by our team for quality and reliability
                    </p>
                </div>
                <Link href="/marketplace">
                    <Button variant="outline" className="hidden sm:flex">
                        View all
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredServices.map((service) => (
                    <ServiceCard key={service.id} {...service} />
                ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
                <Link href="/marketplace">
                    <Button variant="outline">
                        View all services
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </div>
    </section>
    )
}
export default FeaturedSection
