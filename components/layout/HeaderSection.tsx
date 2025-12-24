"use client"

import React from 'react'
import {Badge} from "@/components/ui/badge"
import {Input} from "@/components/ui/input";
import {ArrowRight, Code2, Gauge, Search, Shield} from "lucide-react";
import {Button} from "@/components/ui/button";
import {CodeBlock} from "@/components/Marketplace/CodeBlock";

const exampleCode = `// Install the DevHub SDK
npm install @devhub/sdk

// Use any microservice in seconds
import { AITextAnalyzer } from '@devhub/sdk';

const analyzer = new AITextAnalyzer({
  apiKey: process.env.DEVHUB_KEY
});

const result = await analyzer.analyze({
  text: "This product exceeded my expectations!",
  features: ['sentiment', 'entities']
});

console.log(result.sentiment); // { score: 0.92, label: 'positive' }`;

const HeaderSection = () => {
    return (
    <section className="relative gradient-hero py-20 lg:py-32 overflow-hidden">
        <div className="container relative z-10 mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8 text-center lg:text-left">
                    <Badge variant="secondary" className="px-4 py-1.5 text-sm">
                        🚀 Over 10,000+ microservices available
                    </Badge>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in">
                        The Marketplace for{" "}
                        <span className="text-primary">Developer Tools</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0" style={{ animationDelay: "0.1s" }}>
                        Buy and sell production-ready APIs, automations, and AI tools. Ship faster with battle-tested microservices.
                    </p>

                    {/* Search bar */}
                    <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto lg:mx-0" style={{ animationDelay: "0.2s" }}>
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                placeholder="Search APIs, automations, AI tools..."
                                className="pl-12 h-14 text-base rounded-xl border-2 focus:border-primary"
                            />
                        </div>
                        <Button variant="default" size="lg" className={"h-14"}>
                            Explore
                            <ArrowRight className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Trust badges */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-accent" />
                            <span>Verified sellers</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Gauge className="h-5 w-5 text-accent" />
                            <span>99.9% uptime SLA</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Code2 className="h-5 w-5 text-accent" />
                            <span>TypeScript ready</span>
                        </div>
                    </div>
                </div>

                {/* Code preview */}
                <div className="hidden lg:block animate-slide-in-right" style={{ animationDelay: "0.3s" }}>
                    <CodeBlock code={exampleCode} language="typescript" />
                </div>
            </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
            <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-primary blur-3xl" />
            <div className="absolute bottom-20 right-40 w-64 h-64 rounded-full bg-accent blur-3xl" />
        </div>
    </section>
    )
}
export default HeaderSection
