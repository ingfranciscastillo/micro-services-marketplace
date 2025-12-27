"use client"

import Link from "next/link";
import {useParams} from "next/navigation";
import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServiceCard, ServiceCardProps } from "@/components/marketplace/ServiceCard";
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
    CreditCard,
    Mail,
    Database,
    Cloud,
    Webhook,
    Shield,
    FileCode,
    BarChart3,
    Image,
    Globe,
    Lock,
    Star,
    X
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// Category metadata
const categoryMeta: Record<string, { name: string; description: string; icon: React.ElementType; color: string }> = {
    ai: { name: "AI & Machine Learning", description: "NLP, computer vision, predictive models, and AI-powered APIs", icon: Bot, color: "#8B5CF6" },
    payments: { name: "Payment Processing", description: "Stripe, PayPal, crypto integrations, and billing solutions", icon: CreditCard, color: "#10B981" },
    communication: { name: "Email & Messaging", description: "Transactional emails, SMS APIs, and push notifications", icon: Mail, color: "#F59E0B" },
    database: { name: "Database & Storage", description: "ORMs, backups, file storage, and caching solutions", icon: Database, color: "#3B82F6" },
    cloud: { name: "Cloud Infrastructure", description: "AWS, GCP, Azure, and serverless deployment tools", icon: Cloud, color: "#EC4899" },
    webhooks: { name: "Webhooks & APIs", description: "API gateways, webhook handlers, and integrations", icon: Webhook, color: "#6366F1" },
    auth: { name: "Authentication", description: "OAuth, SSO, MFA, and identity management", icon: Shield, color: "#14B8A6" },
    codegen: { name: "Code Generation", description: "Code formatters, linters, and documentation generators", icon: FileCode, color: "#F97316" },
    analytics: { name: "Analytics & Monitoring", description: "Usage tracking, error monitoring, and performance metrics", icon: BarChart3, color: "#EF4444" },
    media: { name: "Media Processing", description: "Image optimization, video encoding, and file conversion", icon: Image, color: "#A855F7" },
    localization: { name: "Localization", description: "Translation APIs, i18n tools, and currency conversion", icon: Globe, color: "#0EA5E9" },
    security: { name: "Security", description: "Encryption, vulnerability scanning, and threat detection", icon: Lock, color: "#DC2626" },
};

// Mock services data
const allServices: ServiceCardProps[] = [
    { id: "1", name: "GPT-4 API Wrapper", description: "Simplified access to OpenAI's GPT-4 with built-in rate limiting, caching, and prompt templates.", price: 29, rating: 4.9, reviews: 234, downloads: 12500, category: "ai", tags: ["AI", "NLP", "GPT-4"], author: { name: "AI Labs" }, featured: true },
    { id: "2", name: "Sentiment Analyzer", description: "Real-time sentiment analysis for social media, reviews, and customer feedback.", price: 15, rating: 4.7, reviews: 189, downloads: 8700, category: "ai", tags: ["AI", "NLP", "Sentiment"], author: { name: "TextMind" } },
    { id: "3", name: "Image Recognition API", description: "Object detection, face recognition, and image classification using deep learning.", price: 35, rating: 4.8, reviews: 312, downloads: 15200, category: "ai", tags: ["AI", "Vision", "ML"], author: { name: "VisionAI" }, featured: true },
    { id: "4", name: "Voice-to-Text Pro", description: "High-accuracy speech recognition with support for 50+ languages.", price: 25, rating: 4.6, reviews: 156, downloads: 9800, category: "ai", tags: ["AI", "Speech", "Transcription"], author: { name: "AudioTech" } },
    { id: "5", name: "ML Model Trainer", description: "AutoML platform for training custom models without code.", price: 49, rating: 4.5, reviews: 98, downloads: 4500, category: "ai", tags: ["AI", "AutoML", "Training"], author: { name: "DataForge" } },
    { id: "6", name: "Stripe Payment Gateway", description: "Pre-built payment flow with subscriptions, invoicing, and webhook handling.", price: 0, rating: 4.9, reviews: 892, downloads: 78000, category: "payments", tags: ["Stripe", "Payments", "Subscriptions"], author: { name: "PayStack" }, featured: true },
    { id: "7", name: "PayPal Integration Kit", description: "Complete PayPal integration with checkout, refunds, and disputes handling.", price: 19, rating: 4.7, reviews: 445, downloads: 32000, category: "payments", tags: ["PayPal", "Payments", "Checkout"], author: { name: "PayFlow" } },
    { id: "8", name: "Crypto Payment Gateway", description: "Accept Bitcoin, Ethereum, and 20+ cryptocurrencies seamlessly.", price: 39, rating: 4.4, reviews: 87, downloads: 5600, category: "payments", tags: ["Crypto", "Bitcoin", "Payments"], author: { name: "CryptoGate" } },
    { id: "9", name: "Email Service Pro", description: "Reliable transactional email API with templates, analytics, and high deliverability.", price: 19, rating: 4.8, reviews: 567, downloads: 45000, category: "communication", tags: ["Email", "SMTP", "Templates"], author: { name: "MailForge" } },
    { id: "10", name: "SMS Gateway", description: "Global SMS delivery with two-way messaging and shortcode support.", price: 12, rating: 4.6, reviews: 234, downloads: 18000, category: "communication", tags: ["SMS", "Messaging", "OTP"], author: { name: "TextBlast" } },
    { id: "11", name: "Push Notification Hub", description: "Cross-platform push notifications for iOS, Android, and web.", price: 15, rating: 4.7, reviews: 178, downloads: 14500, category: "communication", tags: ["Push", "Notifications", "Mobile"], author: { name: "PushPro" } },
    { id: "12", name: "PostgreSQL Manager", description: "Database migrations, backups, and query optimization tools.", price: 22, rating: 4.8, reviews: 289, downloads: 21000, category: "database", tags: ["PostgreSQL", "Database", "Migrations"], author: { name: "DBTools" } },
    { id: "13", name: "Redis Cache Layer", description: "High-performance caching with automatic key management and clustering.", price: 18, rating: 4.7, reviews: 198, downloads: 16800, category: "database", tags: ["Redis", "Cache", "Performance"], author: { name: "CacheFlow" } },
    { id: "14", name: "S3 Storage Helper", description: "Simplified AWS S3 operations with presigned URLs and CDN integration.", price: 14, rating: 4.6, reviews: 312, downloads: 28000, category: "database", tags: ["S3", "Storage", "CDN"], author: { name: "CloudFiles" } },
    { id: "15", name: "Serverless Deploy", description: "One-click deployment to AWS Lambda, Vercel, and Cloudflare Workers.", price: 29, rating: 4.8, reviews: 456, downloads: 35000, category: "cloud", tags: ["Serverless", "Deploy", "AWS"], author: { name: "DeployKit" }, featured: true },
    { id: "16", name: "Kubernetes Manager", description: "Simplified K8s cluster management with auto-scaling and monitoring.", price: 45, rating: 4.5, reviews: 123, downloads: 8900, category: "cloud", tags: ["Kubernetes", "DevOps", "Containers"], author: { name: "K8sTools" } },
    { id: "17", name: "Webhook Relay", description: "Forward, transform, and retry webhooks with detailed logging.", price: 9, rating: 4.5, reviews: 89, downloads: 6700, category: "webhooks", tags: ["Webhooks", "API", "Relay"], author: { name: "HookMaster" } },
    { id: "18", name: "API Gateway Pro", description: "Rate limiting, authentication, and request routing for APIs.", price: 35, rating: 4.7, reviews: 234, downloads: 18500, category: "webhooks", tags: ["API", "Gateway", "Security"], author: { name: "APIForge" } },
    { id: "19", name: "Auth0 Wrapper", description: "Simplified authentication with SSO, MFA, and social login built-in.", price: 39, rating: 4.8, reviews: 456, downloads: 34000, category: "auth", tags: ["Auth", "SSO", "OAuth"], author: { name: "SecureID" } },
    { id: "20", name: "JWT Manager", description: "Token generation, validation, and refresh flow implementation.", price: 12, rating: 4.6, reviews: 167, downloads: 12300, category: "auth", tags: ["JWT", "Auth", "Tokens"], author: { name: "TokenFlow" } },
    { id: "21", name: "Code Formatter API", description: "Format code in 30+ languages with customizable style rules.", price: 8, rating: 4.5, reviews: 89, downloads: 5600, category: "codegen", tags: ["Formatter", "Code", "Linting"], author: { name: "CodeStyle" } },
    { id: "22", name: "API Doc Generator", description: "Generate OpenAPI specs and documentation from code automatically.", price: 19, rating: 4.7, reviews: 145, downloads: 9800, category: "codegen", tags: ["Docs", "OpenAPI", "Generator"], author: { name: "DocForge" } },
    { id: "23", name: "Analytics Dashboard", description: "Real-time analytics with custom events, funnels, and cohorts.", price: 29, rating: 4.8, reviews: 312, downloads: 24500, category: "analytics", tags: ["Analytics", "Metrics", "Dashboard"], author: { name: "MetricsHub" }, featured: true },
    { id: "24", name: "Error Tracker", description: "Exception monitoring with stack traces, alerts, and integrations.", price: 15, rating: 4.7, reviews: 234, downloads: 19800, category: "analytics", tags: ["Errors", "Monitoring", "Alerts"], author: { name: "BugWatch" } },
    { id: "25", name: "Image Optimizer", description: "Compress, resize, and convert images on-the-fly with WebP support.", price: 15, rating: 4.7, reviews: 189, downloads: 23000, category: "media", tags: ["Images", "CDN", "Optimization"], author: { name: "MediaFlow" } },
    { id: "26", name: "Video Encoder", description: "Transcode videos to multiple formats with thumbnail generation.", price: 35, rating: 4.6, reviews: 98, downloads: 7800, category: "media", tags: ["Video", "Encoding", "Transcoding"], author: { name: "VideoKit" } },
    { id: "27", name: "Translation API", description: "Neural machine translation for 100+ language pairs.", price: 22, rating: 4.8, reviews: 234, downloads: 18500, category: "localization", tags: ["Translation", "i18n", "NLP"], author: { name: "LangBridge" } },
    { id: "28", name: "Currency Converter", description: "Real-time exchange rates with historical data and crypto support.", price: 9, rating: 4.5, reviews: 123, downloads: 8900, category: "localization", tags: ["Currency", "Forex", "API"], author: { name: "RateFlow" } },
    { id: "29", name: "Encryption Toolkit", description: "AES, RSA, and hash functions with key management.", price: 25, rating: 4.8, reviews: 189, downloads: 14500, category: "security", tags: ["Encryption", "Security", "Crypto"], author: { name: "CryptoLib" } },
    { id: "30", name: "Vulnerability Scanner", description: "Automated security scanning for dependencies and code.", price: 45, rating: 4.7, reviews: 156, downloads: 11200, category: "security", tags: ["Security", "Scanning", "Vulnerabilities"], author: { name: "SecureScan" } },
];

const priceRanges = [
    { value: "free", label: "Free", min: 0, max: 0 },
    { value: "under-20", label: "Under $20", min: 1, max: 19 },
    { value: "20-50", label: "$20 - $50", min: 20, max: 50 },
    { value: "over-50", label: "Over $50", min: 51, max: Infinity },
];

const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
];

const CategoryDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("popular");
    const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
    const [minRating, setMinRating] = useState<number>(0);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

    const category = categoryMeta[slug || ""] || null;
    const CategoryIcon = category?.icon || Bot;

    // Filter services
    const filteredServices = useMemo(() => {
        let services = allServices.filter(s => s.category === slug);

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            services = services.filter(s =>
                s.name.toLowerCase().includes(query) ||
                s.description.toLowerCase().includes(query) ||
                s.tags.some(t => t.toLowerCase().includes(query))
            );
        }

        // Price filter
        if (selectedPrices.length > 0) {
            services = services.filter(s => {
                return selectedPrices.some(priceRange => {
                    const range = priceRanges.find(r => r.value === priceRange);
                    if (!range) return false;
                    if (range.value === "free") return s.price === 0;
                    return s.price >= range.min && s.price <= range.max;
                });
            });
        }

        // Rating filter
        if (minRating > 0) {
            services = services.filter(s => s.rating >= minRating);
        }

        // Featured filter
        if (showFeaturedOnly) {
            services = services.filter(s => s.featured);
        }

        // Sort
        switch (sortBy) {
            case "popular":
                services.sort((a, b) => b.downloads - a.downloads);
                break;
            case "rating":
                services.sort((a, b) => b.rating - a.rating);
                break;
            case "newest":
                services.sort((a, b) => parseInt(b.id) - parseInt(a.id));
                break;
            case "price-low":
                services.sort((a, b) => a.price - b.price);
                break;
            case "price-high":
                services.sort((a, b) => b.price - a.price);
                break;
        }

        return services;
    }, [slug, searchQuery, selectedPrices, minRating, sortBy, showFeaturedOnly]);

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
        setShowFeaturedOnly(false);
        setSortBy("popular");
    };

    const hasActiveFilters = searchQuery || selectedPrices.length > 0 || minRating > 0 || showFeaturedOnly;

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

            {/* Featured filter */}
            <div>
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="featured"
                        checked={showFeaturedOnly}
                        onCheckedChange={(checked) => setShowFeaturedOnly(checked === true)}
                    />
                    <label
                        htmlFor="featured"
                        className="text-sm text-muted-foreground cursor-pointer"
                    >
                        Featured only
                    </label>
                </div>
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
                            <CategoryIcon className="h-8 w-8" style={{ color: category.color }} />
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

                                <Select value={sortBy} onValueChange={setSortBy}>
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
                                {showFeaturedOnly && (
                                    <Badge variant="secondary" className="flex items-center gap-1">
                                        Featured only
                                        <button onClick={() => setShowFeaturedOnly(false)}>
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
