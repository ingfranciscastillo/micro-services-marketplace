"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, Menu, Zap} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {usePathname, useRouter} from "next/navigation";
import { ModeToggle } from "@/components/modeToggle";
import { authClient } from "@/lib/auth/auth-client";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

const navLinks = [
  { label: "Explore", href: "/marketplace" },
  {label: "Categories", href: "/categories"},
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = usePathname();
  const { data: session } = authClient.useSession();
  const router = useRouter();

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
          <ModeToggle />
          {/* Search button mobile */}
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Search className="h-5 w-5" />
          </Button>

          {session ? (
            <>
              <Link href={"/dashboard"}>
                <Button variant="outline" className="w-full">
                  Dashboard
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size={"icon"} className={"rounded-full focus:outline-none"} variant={"outline"}>
                    <Avatar className={"size-8"}>
                      <AvatarImage src={session.user.image ?? undefined} alt={"user avatar"} />
                      <AvatarFallback>
                        {session.user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                      className="text-red-500"
                      onClick={async () => {
                        await authClient.signOut()
                        router.push("/")
                      }}
                  >
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden sm:block">
                <Button variant="ghost">Sign in</Button>
              </Link>
              <Link href="/register">
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
                {
                  session ? (
                      <>
                        <Link href={"/dashboard"}>
                          <Button variant="outline" className="w-full">
                            Dashboard
                          </Button>
                        </Link>
                      </>
                  ) : (
                      <>
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full">
                            Sign in
                          </Button>
                        </Link>
                        <Link href="/register" onClick={() => setIsOpen(false)}>
                          <Button variant="default" className="w-full">
                            Get Started
                          </Button>
                        </Link>
                      </>
                  )
                }
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
