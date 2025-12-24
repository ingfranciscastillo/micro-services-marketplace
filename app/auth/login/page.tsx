"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner"
import { Zap, Mail, Eye, EyeOff } from "lucide-react";
import {GithubDark} from "@/components/ui/svgs/githubDark";
import {GithubLight} from "@/components/ui/svgs/githubLight";

import {useTheme} from "next-themes"
import {Google} from "@/components/ui/svgs/google";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {theme} = useTheme()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate login
        await new Promise((resolve) => setTimeout(resolve, 1000));

        toast("Welcome back", {
            description: "You've successfully signed in.",
        });

        setIsLoading(false);
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 gradient-hero">
            <div className="w-full max-w-md">
                {/* Logo */}
                <Link href="/" className="flex items-center justify-center gap-2 mb-8">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
                        <Zap className="h-6 w-6 text-foreground" />
                    </div>
                    <span className="text-2xl font-bold">DevHub</span>
                </Link>

                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Welcome back</CardTitle>
                        <CardDescription>
                            Sign in to your account to continue
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <Link
                                        href="/auth/forgot-password"
                                        className="text-sm text-primary hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-3"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Checkbox id="remember" />
                                <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                                    Remember me for 30 days
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                variant="default"
                                className="w-full"
                                size="lg"
                                disabled={isLoading}
                            >
                                {isLoading ? "Signing in..." : "Sign in"}
                            </Button>
                        </form>

                        <div className="relative my-6">
                            <Separator />
                            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                OR CONTINUE WITH
              </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="w-full">
                                {
                                    theme === "dark" ? (
                                        <GithubDark className="h-4 w-4 mr-2" />
                                    ) : (
                                        <GithubLight className="h-4 w-4 mr-2" />
                                    )
                                }
                                GitHub
                            </Button>
                            <Button variant="outline" className="w-full">
                                <Google className="h-4 w-4 mr-2" />
                                Google
                            </Button>
                        </div>

                        <p className="text-center text-sm text-muted-foreground mt-6">
                            Don't have an account?{" "}
                            <Link href="/auth/register" className="text-primary hover:underline font-medium">
                                Sign up
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
