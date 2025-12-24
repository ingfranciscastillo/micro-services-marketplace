"use client"
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    Search,
    Menu,
    Zap,
    ShoppingCart,
    Bell
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {usePathname} from "next/navigation"
import {ModeToggle} from "@/components/modeToggle";

const navLinks = [
    { label: "Explore", href: "/marketplace" },
    { label: "Categories", href: "/categories" },
    { label: "Pricing", href: "/pricing" },
    { label: "Docs", href: "/docs" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = usePathname();
    const isLoggedIn = true; // This would come from auth context

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
                        <Zap className="h-5 w-5 text-foreground" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">DevHub</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium transition-colors hover:text-primary ${
                                location === link.href
                                    ? "text-primary"
                                    : "text-muted-foreground"
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Search - Desktop */}
                <div className="hidden lg:flex relative max-w-sm flex-1 mx-8">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search APIs, automations..."
                        className="pl-10 bg-secondary border-0"
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <ModeToggle/>
                    {/* Search button mobile */}
                    <Button variant="ghost" size="icon" className="lg:hidden">
                        <Search className="h-5 w-5" />
                    </Button>

                    {isLoggedIn ? (
                        <>
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="h-5 w-5" />
                                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
                                    3
                                </Badge>
                            </Button>
                            <Button variant="ghost" size="icon">
                                <ShoppingCart className="h-5 w-5" />
                            </Button>
                            <Avatar className="h-9 w-9 cursor-pointer">
                                <AvatarImage src="" />
                                <AvatarFallback className="bg-primary text-foreground text-sm">
                                    JD
                                </AvatarFallback>
                            </Avatar>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/login" className="hidden sm:block">
                                <Button variant="ghost">Sign in</Button>
                            </Link>
                            <Link href="/auth/register">
                                <Button variant="default" className="hidden sm:flex">
                                    Get Started
                                </Button>
                            </Link>
                        </>
                    )}

                    {/* Mobile menu */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className={"w-80"}>
                            <nav className="flex flex-col gap-4 m-8">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`text-lg font-medium transition-colors hover:text-primary ${
                                            location === link.href
                                                ? "text-primary"
                                                : "text-muted-foreground"
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <hr className="my-4" />
                                <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                                    <Button variant="outline" className="w-full">
                                        Sign in
                                    </Button>
                                </Link>
                                <Link href="/auth/register" onClick={() => setIsOpen(false)}>
                                    <Button variant="default" className="w-full">
                                        Get Started
                                    </Button>
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
