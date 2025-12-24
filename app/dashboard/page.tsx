"use client";
import { useState } from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    LayoutDashboard,
    Package,
    CreditCard,
    FileText,
    Settings,
    BarChart3,
    MessageCircle,
    Bell,
    TrendingUp,
    Users,
    DollarSign,
    Zap,
    ChevronRight,
    Plus,
} from "lucide-react";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: Package, label: "My Services", href: "/dashboard/services" },
    { icon: CreditCard, label: "Purchases", href: "/dashboard/purchases" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
    { icon: MessageCircle, label: "Messages", href: "/dashboard/messages" },
    { icon: FileText, label: "Invoices", href: "/dashboard/invoices" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

const purchasedServices = [
    { id: "1", name: "AI Text Analyzer", plan: "Pro", nextBilling: "Jan 15, 2025", usage: "32,450 / 50,000 requests", status: "active" },
    { id: "2", name: "Email Service Pro", plan: "Starter", nextBilling: "Jan 20, 2025", usage: "756 / 1,000 emails", status: "active" },
    { id: "3", name: "Stripe Payment Gateway", plan: "Free", nextBilling: "—", usage: "890 / 1,000 transactions", status: "active" },
];

const sellerServices = [
    { id: "s1", name: "Custom Auth Wrapper", downloads: 1234, revenue: 4560, rating: 4.7, status: "published" },
    { id: "s2", name: "MongoDB Backup Tool", downloads: 567, revenue: 1890, rating: 4.5, status: "published" },
    { id: "s3", name: "GraphQL Gateway", downloads: 0, revenue: 0, rating: 0, status: "draft" },
];

const recentActivity = [
    { type: "purchase", message: "Subscribed to AI Text Analyzer Pro", time: "2 hours ago" },
    { type: "review", message: "Received 5-star review on Custom Auth Wrapper", time: "5 hours ago" },
    { type: "payout", message: "Received payout of $456.00", time: "1 day ago" },
    { type: "message", message: "New message from Sarah Chen", time: "2 days ago" },
];

function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden lg:flex flex-col w-64 border-r bg-card min-h-[calc(100vh-4rem)]">
            <nav className="flex-1 p-4">
                <ul className="space-y-1">
                    {sidebarItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                                    pathname === item.href
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                }`}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-4 border-t">
                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Become a seller</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                            Start earning by selling your microservices
                        </p>
                        <Button variant="default" size="sm" className="w-full">
                            Start Selling
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </aside>
    );
}

export default function Dashboard() {
    const [view, setView] = useState<"buyer" | "seller">("buyer");

    return (
        <div className="min-h-screen flex flex-col bg-secondary/30">
            <Navbar />

            <div className="flex flex-1">
                <Sidebar />

                <main className="flex-1 p-6 lg:p-8 overflow-auto">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
                            <p className="text-muted-foreground">Welcome back, John!</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="outline" size="icon">
                                <Bell className="h-5 w-5" />
                            </Button>
                            <Tabs value={view} onValueChange={(v) => setView(v as "buyer" | "seller")}>
                                <TabsList>
                                    <TabsTrigger value="buyer">Buyer</TabsTrigger>
                                    <TabsTrigger value="seller">Seller</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                    </div>

                    {view === "buyer" ? (
                        <>
                            {/* Stats */}
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Active Subscriptions</p>
                                                <p className="text-2xl font-bold">3</p>
                                            </div>
                                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                                <Package className="h-5 w-5 text-primary" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-muted-foreground">API Calls (30d)</p>
                                                <p className="text-2xl font-bold">45.2K</p>
                                            </div>
                                            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                                <TrendingUp className="h-5 w-5 text-accent" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Monthly Spend</p>
                                                <p className="text-2xl font-bold">$67</p>
                                            </div>
                                            <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                                                <DollarSign className="h-5 w-5 text-warning" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Saved Services</p>
                                                <p className="text-2xl font-bold">12</p>
                                            </div>
                                            <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                                                <Zap className="h-5 w-5 text-destructive" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Subscriptions */}
                            <Card className="mb-8">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>Active Subscriptions</CardTitle>
                                    <Link href="/dashboard/purchases">
                                        <Button variant="ghost" size="sm">
                                            View all
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {purchasedServices.map((service) => (
                                            <div
                                                key={service.id}
                                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-secondary/50"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center">
                                                        <Zap className="h-5 w-5 text-primary-foreground" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{service.name}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {service.plan} • Next billing: {service.nextBilling}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-right">
                                                        <p className="text-sm font-medium">{service.usage}</p>
                                                        <p className="text-xs text-muted-foreground">Usage</p>
                                                    </div>
                                                    <Badge variant="default">Active</Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    ) : (
                        <>
                            {/* Seller Stats */}
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Total Revenue</p>
                                                <p className="text-2xl font-bold">$6,450</p>
                                            </div>
                                            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                                <DollarSign className="h-5 w-5 text-accent" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Total Downloads</p>
                                                <p className="text-2xl font-bold">1,801</p>
                                            </div>
                                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                                <TrendingUp className="h-5 w-5 text-primary" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Active Customers</p>
                                                <p className="text-2xl font-bold">234</p>
                                            </div>
                                            <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                                                <Users className="h-5 w-5 text-warning" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Avg Rating</p>
                                                <p className="text-2xl font-bold">4.6</p>
                                            </div>
                                            <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                                                <Zap className="h-5 w-5 text-destructive" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* My Services */}
                            <Card className="mb-8">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>My Services</CardTitle>
                                    <Button variant="default" size="sm">
                                        <Plus className="h-4 w-4 mr-1" />
                                        New Service
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {sellerServices.map((service) => (
                                            <div
                                                key={service.id}
                                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-secondary/50"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center">
                                                        <Zap className="h-5 w-5 text-primary-foreground" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{service.name}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {service.downloads.toLocaleString()} downloads • ${service.revenue.toLocaleString()} earned
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    {service.rating > 0 && (
                                                        <div className="text-right">
                                                            <p className="text-sm font-medium">⭐ {service.rating}</p>
                                                        </div>
                                                    )}
                                                    <Badge variant={service.status === "published" ? "default" : "secondary"}>
                                                        {service.status}
                                                    </Badge>
                                                    <Button variant="outline" size="sm">
                                                        Edit
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    )}

                    {/* Recent Activity */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentActivity.map((activity, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                                        <div className="flex-1">
                                            <p className="text-sm">{activity.message}</p>
                                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
}
