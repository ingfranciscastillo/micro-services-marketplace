import Link from "next/link";
import { Zap, Github, Twitter, Linkedin } from "lucide-react";

const footerLinks = {
    Product: [
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "/pricing" },
        { label: "Marketplace", href: "/marketplace" },
        { label: "API Docs", href: "/docs" },
    ],
    Company: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
    ],
    Resources: [
        { label: "Documentation", href: "/docs" },
        { label: "Guides", href: "/guides" },
        { label: "Support", href: "/support" },
        { label: "Status", href: "/status" },
    ],
    Legal: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Cookies", href: "/cookies" },
    ],
};

export function Footer() {
    return (
        <footer className="border-t bg-secondary/30">
            <div className="container mx-auto py-12 md:py-16">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
                                <Zap className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold">DevHub</span>
                        </Link>
                        <p className="text-sm text-muted-foreground mb-4">
                            The marketplace for developers to buy and sell microservices.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="font-semibold mb-4">{category}</h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © 2024 DevHub. All rights reserved.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Built with ❤️ for developers
                    </p>
                </div>
            </div>
        </footer>
    );
}
