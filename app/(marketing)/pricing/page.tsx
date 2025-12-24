"use client";
import { useState } from "react";
import { Check, X, Zap, Building2, Rocket, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const pricingTiers = [
    {
        name: "Starter",
        description: "Perfect for individual developers and small projects",
        monthlyPrice: 0,
        yearlyPrice: 0,
        icon: Zap,
        features: [
            "5 API calls per month",
            "Access to free microservices",
            "Community support",
            "Basic analytics",
            "1 project",
        ],
        cta: "Get Started",
        popular: false,
    },
    {
        name: "Pro",
        description: "For professional developers and growing teams",
        monthlyPrice: 29,
        yearlyPrice: 290,
        icon: Rocket,
        features: [
            "10,000 API calls per month",
            "Access to all microservices",
            "Priority support",
            "Advanced analytics",
            "Unlimited projects",
            "Custom integrations",
            "API key management",
        ],
        cta: "Start Free Trial",
        popular: true,
    },
    {
        name: "Enterprise",
        description: "For large organizations with custom needs",
        monthlyPrice: 99,
        yearlyPrice: 990,
        icon: Building2,
        features: [
            "Unlimited API calls",
            "Access to all microservices",
            "Dedicated support",
            "Custom analytics & reporting",
            "Unlimited projects",
            "Custom integrations",
            "API key management",
            "SLA guarantee",
            "On-premise deployment",
            "Custom contracts",
        ],
        cta: "Contact Sales",
        popular: false,
    },
];

const featureComparison = [
    { feature: "API Calls", starter: "5/month", pro: "10,000/month", enterprise: "Unlimited" },
    { feature: "Microservices Access", starter: "Free only", pro: "All", enterprise: "All + Custom" },
    { feature: "Projects", starter: "1", pro: "Unlimited", enterprise: "Unlimited" },
    { feature: "Team Members", starter: "1", pro: "5", enterprise: "Unlimited" },
    { feature: "Analytics", starter: true, pro: true, enterprise: true },
    { feature: "Advanced Analytics", starter: false, pro: true, enterprise: true },
    { feature: "Custom Integrations", starter: false, pro: true, enterprise: true },
    { feature: "API Key Management", starter: false, pro: true, enterprise: true },
    { feature: "Priority Support", starter: false, pro: true, enterprise: true },
    { feature: "Dedicated Account Manager", starter: false, pro: false, enterprise: true },
    { feature: "SLA Guarantee", starter: false, pro: false, enterprise: true },
    { feature: "On-premise Deployment", starter: false, pro: false, enterprise: true },
    { feature: "Custom Contracts", starter: false, pro: false, enterprise: true },
];

const faqs = [
    {
        question: "How do API calls work?",
        answer: "Each time your application makes a request to any microservice through our platform, it counts as one API call. Calls are counted monthly and reset at the beginning of each billing cycle.",
    },
    {
        question: "Can I upgrade or downgrade my plan?",
        answer: "Yes, you can change your plan at any time. When upgrading, you'll be charged a prorated amount for the remainder of your billing cycle. When downgrading, the new rate takes effect at the start of your next billing cycle.",
    },
    {
        question: "What happens if I exceed my API call limit?",
        answer: "If you exceed your monthly API call limit, additional calls are billed at $0.001 per call for Pro plans. Enterprise plans have custom overage rates. You can also upgrade your plan to get more included calls.",
    },
    {
        question: "Do you offer refunds?",
        answer: "We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team within 14 days of your purchase for a full refund.",
    },
    {
        question: "Is there a free trial for paid plans?",
        answer: "Yes! Pro plans come with a 14-day free trial. No credit card required to start. Enterprise trials are available upon request with a demo.",
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and wire transfers for Enterprise plans. All payments are processed securely through Stripe.",
    },
    {
        question: "Can I sell my own microservices on the platform?",
        answer: "Absolutely! Any developer can become a seller. You'll earn 80% of each sale, with 20% going to platform fees. Enterprise sellers can negotiate custom revenue sharing agreements.",
    },
    {
        question: "What kind of support do you offer?",
        answer: "Starter plans have access to community forums and documentation. Pro plans include email support with 24-hour response times. Enterprise plans get dedicated support with phone access and a dedicated account manager.",
    },
];

const Pricing = () => {
    const [isYearly, setIsYearly] = useState(false);

    const renderFeatureValue = (value: boolean | string) => {
        if (typeof value === "boolean") {
            return value ? (
                <Check className="h-5 w-5 text-accent mx-auto" />
            ) : (
                <X className="h-5 w-5 text-muted-foreground/40 mx-auto" />
            );
        }
        return <span className="text-foreground font-medium">{value}</span>;
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="py-16 lg:py-24">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <Badge variant="outline" className="mb-4">
                                Simple, Transparent Pricing
                            </Badge>
                            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                                Choose the perfect plan for your needs
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                Start free and scale as you grow. No hidden fees, no surprises.
                            </p>
                        </div>

                        {/* Billing Toggle */}
                        <div className="flex items-center justify-center gap-4 mb-12">
                            <Label
                                htmlFor="billing-toggle"
                                className={`text-sm ${!isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}
                            >
                                Monthly
                            </Label>
                            <Switch
                                id="billing-toggle"
                                checked={isYearly}
                                onCheckedChange={setIsYearly}
                            />
                            <Label
                                htmlFor="billing-toggle"
                                className={`text-sm ${isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}
                            >
                                Yearly
                                <Badge variant="default" className="ml-2">
                                    Save 20%
                                </Badge>
                            </Label>
                        </div>

                        {/* Pricing Cards */}
                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {pricingTiers.map((tier) => {
                                const Icon = tier.icon;
                                const price = isYearly ? tier.yearlyPrice : tier.monthlyPrice;
                                const period = isYearly ? "/year" : "/month";

                                return (
                                    <Card
                                        key={tier.name}
                                        className={`relative ${tier.popular ? "border-primary ring-2 ring-primary/20" : ""}`}
                                    >
                                        {tier.popular && (
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                                <Badge className="bg-primary text-primary-foreground">
                                                    Most Popular
                                                </Badge>
                                            </div>
                                        )}
                                        <CardHeader className="text-center pb-2">
                                            <div className={`w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center ${tier.popular ? "bg-primary/10" : "bg-muted"}`}>
                                                <Icon className={`h-6 w-6 ${tier.popular ? "text-primary" : "text-muted-foreground"}`} />
                                            </div>
                                            <CardTitle className="text-xl">{tier.name}</CardTitle>
                                            <CardDescription>{tier.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="text-center">
                                            <div className="mb-6">
                        <span className="text-4xl font-bold text-foreground">
                          ${price}
                        </span>
                                                <span className="text-muted-foreground">{period}</span>
                                            </div>
                                            <ul className="space-y-3 text-left">
                                                {tier.features.map((feature) => (
                                                    <li key={feature} className="flex items-start gap-3">
                                                        <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                                                        <span className="text-sm text-muted-foreground">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                        <CardFooter>
                                            <Button
                                                variant={tier.popular ? "default" : "outline"}
                                                className="w-full"
                                                size="lg"
                                            >
                                                {tier.cta}
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Feature Comparison Table */}
                <section className="py-16 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <h2 className="text-3xl font-bold text-foreground mb-4">
                                Compare all features
                            </h2>
                            <p className="text-muted-foreground">
                                See exactly what you get with each plan
                            </p>
                        </div>

                        <div className="max-w-5xl mx-auto overflow-x-auto">
                            <Card>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[250px]">Feature</TableHead>
                                            <TableHead className="text-center">Starter</TableHead>
                                            <TableHead className="text-center bg-primary/5">
                                                <div className="flex items-center justify-center gap-2">
                                                    Pro
                                                    <Badge variant="secondary" className="text-xs">Popular</Badge>
                                                </div>
                                            </TableHead>
                                            <TableHead className="text-center">Enterprise</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {featureComparison.map((row) => (
                                            <TableRow key={row.feature}>
                                                <TableCell className="font-medium">{row.feature}</TableCell>
                                                <TableCell className="text-center">
                                                    {renderFeatureValue(row.starter)}
                                                </TableCell>
                                                <TableCell className="text-center bg-primary/5">
                                                    {renderFeatureValue(row.pro)}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {renderFeatureValue(row.enterprise)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-16 lg:py-24">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                                <HelpCircle className="h-6 w-6 text-primary" />
                            </div>
                            <h2 className="text-3xl font-bold text-foreground mb-4">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-muted-foreground">
                                Everything you need to know about our pricing and plans
                            </p>
                        </div>

                        <div className="max-w-3xl mx-auto">
                            <Accordion type="single" collapsible className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <AccordionItem
                                        key={index}
                                        value={`item-${index}`}
                                        className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
                                    >
                                        <AccordionTrigger className="text-left hover:no-underline py-5">
                                            <span className="font-medium text-foreground">{faq.question}</span>
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground pb-5">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-linear-to-br from-primary/10 via-background to-accent/10">
                    <div className="container mx-auto px-4">
                        <Card className="max-w-4xl mx-auto text-center py-12">
                            <CardContent>
                                <h2 className="text-3xl font-bold text-foreground mb-4">
                                    Ready to get started?
                                </h2>
                                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                                    Join thousands of developers who are already building amazing products with our microservices marketplace.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button variant="default" size="lg">
                                        Start Free Trial
                                    </Button>
                                    <Button variant="outline" size="lg">
                                        Contact Sales
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Pricing;
