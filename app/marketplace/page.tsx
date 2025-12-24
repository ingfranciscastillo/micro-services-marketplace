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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, SlidersHorizontal, X } from "lucide-react";

const allServices = [
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
    {
        id: "7",
        name: "PDF Generator API",
        description: "Generate PDFs from HTML templates with custom fonts, images, and styling.",
        price: 25,
        rating: 4.7,
        reviews: 312,
        downloads: 18500,
        category: "Documents",
        tags: ["PDF", "Templates", "Export"],
        author: { name: "DocuForge" },
    },
    {
        id: "8",
        name: "GPT-4 Wrapper",
        description: "Simplified OpenAI integration with prompt templates and response caching.",
        price: 49,
        rating: 4.9,
        reviews: 678,
        downloads: 52000,
        category: "AI/ML",
        tags: ["GPT-4", "OpenAI", "LLM"],
        author: { name: "AI Solutions" },
        featured: true,
    },
    {
        id: "9",
        name: "Webhook Relay",
        description: "Forward, transform, and retry webhooks with detailed logging and debugging.",
        price: 9,
        rating: 4.5,
        reviews: 89,
        downloads: 6700,
        category: "Infrastructure",
        tags: ["Webhooks", "API", "Relay"],
        author: { name: "HookMaster" },
    },
];

const categories = [
    "All Categories",
    "AI/ML",
    "Authentication",
    "Communication",
    "DevOps",
    "Documents",
    "Infrastructure",
    "Media",
    "Payments",
];

const priceRanges = [
    { label: "Free", value: "free" },
    { label: "Under $20", value: "under-20" },
    { label: "$20 - $50", value: "20-50" },
    { label: "Over $50", value: "over-50" },
];

function FilterSidebar({ className }: { className?: string }) {
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
                                <SelectItem key={cat} value={cat}>
                                    {cat}
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

export default function Marketplace() {
    const [searchQuery, setSearchQuery] = useState("");

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
                                    <h2 className="font-semibold text-lg mb-6">Filters</h2>
                                    <FilterSidebar />
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
                                {allServices.map((service) => (
                                    <ServiceCard key={service.id} {...service} />
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
