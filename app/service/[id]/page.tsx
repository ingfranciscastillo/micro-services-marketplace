"use client";
import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CodeBlock } from "@/components/marketplace/CodeBlock";
import {
    Star,
    Download,
    Check,
    Zap,
    ArrowLeft,
    Heart,
    Share2,
    MessageCircle,
    ExternalLink,
    Shield,
    Clock
} from "lucide-react";
import { useParams } from 'next/navigation'

const serviceData = {
    id: "1",
    name: "AI Text Analyzer",
    description: "Advanced NLP service for sentiment analysis, entity extraction, and text classification. Built on top of the latest transformer models with enterprise-grade reliability.",
    longDescription: `AI Text Analyzer is a production-ready NLP microservice that provides powerful text analysis capabilities through a simple REST API.

### Key Features
- **Sentiment Analysis**: Detect positive, negative, or neutral sentiment with confidence scores
- **Entity Extraction**: Identify people, organizations, locations, dates, and custom entities
- **Text Classification**: Categorize text into custom categories with high accuracy
- **Language Detection**: Automatically detect the language of input text
- **Summarization**: Generate concise summaries of long documents

### Use Cases
- Customer feedback analysis
- Social media monitoring
- Content moderation
- Document processing
- Chatbot intelligence`,
    price: 29,
    rating: 4.9,
    reviewCount: 234,
    downloads: 12500,
    category: "AI/ML",
    tags: ["NLP", "Sentiment", "REST API", "TypeScript", "Python"],
    author: {
        name: "AILabs",
        avatar: "",
        verified: true,
        services: 12,
        rating: 4.8,
    },
    plans: [
        {
            name: "Starter",
            price: 0,
            requests: "1,000 requests/mo",
            features: ["Sentiment analysis", "Basic entities", "Community support"],
        },
        {
            name: "Pro",
            price: 29,
            requests: "50,000 requests/mo",
            features: ["All features", "Custom entities", "Priority support", "99.9% SLA"],
            popular: true,
        },
        {
            name: "Enterprise",
            price: 149,
            requests: "Unlimited",
            features: ["All Pro features", "Dedicated support", "Custom models", "On-premise option"],
        },
    ],
    reviewsList: [
        {
            id: "r1",
            author: "Sarah Chen",
            rating: 5,
            date: "2024-01-15",
            content: "Incredibly easy to integrate. The TypeScript SDK is well documented and the API is fast and reliable.",
        },
        {
            id: "r2",
            author: "Marcus Johnson",
            rating: 5,
            date: "2024-01-10",
            content: "We've been using this for our customer feedback analysis pipeline. Accuracy is impressive!",
        },
        {
            id: "r3",
            author: "Emily Rodriguez",
            rating: 4,
            date: "2024-01-05",
            content: "Great service overall. Would love to see more language support in future updates.",
        },
    ],
};

const installCode = `npm install @devhub/ai-text-analyzer`;

const usageCode = `import { TextAnalyzer } from '@devhub/ai-text-analyzer';

const analyzer = new TextAnalyzer({
  apiKey: process.env.DEVHUB_API_KEY
});

// Analyze sentiment
const sentiment = await analyzer.sentiment(
  "I absolutely love this product!"
);
console.log(sentiment);
// { score: 0.95, label: 'positive' }

// Extract entities
const entities = await analyzer.entities(
  "Apple CEO Tim Cook announced new products in Cupertino."
);
console.log(entities);
// [
//   { text: 'Apple', type: 'ORGANIZATION' },
//   { text: 'Tim Cook', type: 'PERSON' },
//   { text: 'Cupertino', type: 'LOCATION' }
// ]`;

export default function ServiceDetail() {
    const { id } = useParams();
    const [selectedPlan, setSelectedPlan] = useState(1);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 py-8">
                <div className="container mx-auto relative z-10">
                    {/* Breadcrumb */}
                    <div className="mb-6">
                        <Link
                            href="/marketplace"
                            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Marketplace
                        </Link>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Header */}
                            <div className="flex items-start gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary shrink-0">
                                    <Zap className="h-8 w-8 text-primary-foreground" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h1 className="text-2xl md:text-3xl font-bold">{serviceData.name}</h1>
                                        <Badge variant="default">Featured</Badge>
                                    </div>
                                    <p className="text-muted-foreground">{serviceData.category}</p>
                                    <div className="flex flex-wrap items-center gap-4 mt-3">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-warning text-warning" />
                                            <span className="font-medium">{serviceData.rating}</span>
                                            <span className="text-muted-foreground">({serviceData.reviewCount} reviews)</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-muted-foreground">
                                            <Download className="h-4 w-4" />
                                            <span>{serviceData.downloads.toLocaleString()} downloads</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {serviceData.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            {/* Tabs */}
                            <Tabs defaultValue="overview" className="w-full">
                                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                                    <TabsTrigger
                                        value="overview"
                                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 pb-3"
                                    >
                                        Overview
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="docs"
                                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 pb-3"
                                    >
                                        API Docs
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="pricing"
                                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 pb-3"
                                    >
                                        Pricing
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="reviews"
                                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 pb-3"
                                    >
                                        Reviews
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="overview" className="mt-6">
                                    <div className="prose prose-slate max-w-none">
                                        <p className="text-lg text-muted-foreground mb-6">
                                            {serviceData.description}
                                        </p>
                                        <div className="whitespace-pre-line text-muted-foreground">
                                            {serviceData.longDescription}
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="docs" className="mt-6 space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3">Installation</h3>
                                        <CodeBlock code={installCode} language="bash" showLineNumbers={false} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3">Quick Start</h3>
                                        <CodeBlock code={usageCode} language="typescript" />
                                    </div>
                                    <Button variant="outline">
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        View full documentation
                                    </Button>
                                </TabsContent>

                                <TabsContent value="pricing" className="mt-6">
                                    <div className="grid sm:grid-cols-3 gap-4">
                                        {serviceData.plans.map((plan, index) => (
                                            <Card
                                                key={plan.name}
                                                className={`cursor-pointer ${selectedPlan === index ? "border-primary border-2" : ""}`}
                                                onClick={() => setSelectedPlan(index)}
                                            >
                                                <CardHeader>
                                                    <div className="flex items-center justify-between">
                                                        <CardTitle className="text-lg">{plan.name}</CardTitle>
                                                        {plan.popular && <Badge variant="default">Popular</Badge>}
                                                    </div>
                                                    <div className="mt-2">
                            <span className="text-3xl font-bold">
                              {plan.price === 0 ? "Free" : `$${plan.price}`}
                            </span>
                                                        {plan.price > 0 && <span className="text-muted-foreground">/mo</span>}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{plan.requests}</p>
                                                </CardHeader>
                                                <CardContent>
                                                    <ul className="space-y-2">
                                                        {plan.features.map((feature) => (
                                                            <li key={feature} className="flex items-center gap-2 text-sm">
                                                                <Check className="h-4 w-4 text-accent shrink-0" />
                                                                {feature}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="reviews" className="mt-6">
                                    <div className="space-y-6">
                                        {serviceData.reviewsList.map((review) => (
                                            <Card key={review.id}>
                                                <CardContent className="pt-6">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div className="flex items-center gap-3">
                                                            <Avatar>
                                                                <AvatarFallback>{review.author.slice(0, 2)}</AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <p className="font-medium">{review.author}</p>
                                                                <p className="text-sm text-muted-foreground">{review.date}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            {Array.from({ length: review.rating }).map((_, i) => (
                                                                <Star key={i} className="h-4 w-4 fill-yellow-300 text-foreground" />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="text-muted-foreground">{review.content}</p>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Purchase card */}
                            <Card className="sticky top-24">
                                <CardContent className="pt-6">
                                    <div className="text-center mb-6">
                                        <div className="text-4xl font-bold mb-1">
                                            ${serviceData.plans[selectedPlan].price}
                                            {serviceData.plans[selectedPlan].price > 0 && (
                                                <span className="text-lg font-normal text-muted-foreground">/mo</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {serviceData.plans[selectedPlan].requests}
                                        </p>
                                    </div>

                                    <Button variant="default" className="w-full mb-3" size="lg">
                                        {serviceData.plans[selectedPlan].price === 0 ? "Get Started Free" : "Subscribe Now"}
                                    </Button>
                                    <Button variant="outline" className="w-full" size="lg">
                                        <MessageCircle className="h-4 w-4 mr-2" />
                                        Contact Seller
                                    </Button>

                                    <div className="flex justify-center gap-4 mt-4 pt-4 border-t">
                                        <Button variant="ghost" size="sm">
                                            <Heart className="h-4 w-4 mr-1" />
                                            Save
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            <Share2 className="h-4 w-4 mr-1" />
                                            Share
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Seller card */}
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={serviceData.author.avatar} />
                                            <AvatarFallback className="bg-primary text-primary-foreground">
                                                {serviceData.author.name.slice(0, 2)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-semibold">{serviceData.author.name}</p>
                                                {serviceData.author.verified && (
                                                    <Badge variant="secondary" className="h-5 px-1.5">
                                                        <Shield className="h-3 w-3" />
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {serviceData.author.services} services
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                        {serviceData.author.rating} rating
                    </span>
                                        <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Responds in 2h
                    </span>
                                    </div>
                                    <Button variant="outline" className="w-full">
                                        View Profile
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
