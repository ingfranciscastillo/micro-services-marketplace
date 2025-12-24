import React from 'react'
import {ArrowRight, Zap} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

const CtaSection = () => {
    return (
    <section className="py-20">
        <div className="container mx-auto relative z-10">
            <div className="bg-secondary rounded-2xl p-8 md:p-12 text-center">
                <div className="flex justify-center mb-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary">
                        <Zap className="h-8 w-8 text-primary-foreground" />
                    </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to ship faster?
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                    Join thousands of developers using DevHub to build and scale their applications with production-ready microservices.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/auth/register">
                        <Button variant="default" size="lg">
                            Get started for free
                            <ArrowRight className="h-5 w-5" />
                        </Button>
                    </Link>
                    <Link href="/marketplace">
                        <Button variant="outline" size="lg">
                            Browse marketplace
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    </section>
    )
}
export default CtaSection
