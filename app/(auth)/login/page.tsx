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
import { Zap, Eye, EyeOff } from "lucide-react";
import {useTheme} from "next-themes"
import {GithubDark} from "@/components/ui/svgs/githubDark";
import {GithubLight} from "@/components/ui/svgs/githubLight";
import {Google} from "@/components/ui/svgs/google";

import {useForm} from "@tanstack/react-form"
import * as z from "zod"
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field"
import {authClient} from "@/lib/auth/auth-client";

const loginSchema = z.object({
    email: z
        .email(),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters."),
    rememberMe: z.boolean()
})

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {theme} = useTheme()

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        validators: {
            onSubmit: loginSchema
        },
        onSubmit: async ({value}) => {
            setIsLoading(true)

           const {data, error} = await authClient.signIn.email({
               email: value.email,
               password: value.password,
               rememberMe: value.rememberMe
           })

            setIsLoading(false)

            if(error) {
                toast.error(error.message)
                return
            }

            router.push("/dashboard")

        }
    })

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
                        <form id={"login-form"} className="space-y-4" onSubmit={(e) => {
                            e.preventDefault();
                            form.handleSubmit()
                        }}>
                            <FieldGroup>
                                <form.Field
                                    name="email"
                                    children={(field) => {
                                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                        return (
                                            <Field data-invalid={isInvalid}>
                                                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    type="email"
                                                    placeholder="you@example.com"
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    aria-invalid={isInvalid}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    autoComplete={"off"}
                                                    required
                                                />
                                                {isInvalid && (
                                                    <FieldError errors={field.state.meta.errors} />
                                                )}
                                            </Field>
                                        )
                                    }}
                                />
                                <form.Field
                                    name="password"
                                    children={(field) => {
                                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                        return (
                                            <Field data-invalid={isInvalid}>
                                                <div className={"flex items-center justify-between"}>
                                                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                                    <Link
                                                        href="/forgot-password"
                                                        className="text-sm text-primary hover:underline"
                                                    >
                                                        Forgot password?
                                                    </Link>
                                                </div>
                                                <div className="relative">
                                                    <Input
                                                        id={field.name}
                                                        name={field.name}
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Enter your password"
                                                        value={field.state.value}
                                                        onBlur={field.handleBlur}
                                                        aria-invalid={isInvalid}
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                        autoComplete={"off"}
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
                                                {isInvalid && (
                                                    <FieldError errors={field.state.meta.errors} />
                                                )}
                                            </Field>
                                        )
                                    }}
                                />
                                <form.Field
                                    name="rememberMe"
                                    children={(field) => {
                                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                        return (
                                            <Field orientation={"horizontal"} data-invalid={isInvalid}>
                                                    <Checkbox
                                                        id={field.name}
                                                        name={field.name}
                                                        checked={field.state.value}
                                                        onCheckedChange={(value) => {
                                                            field.handleChange(!!value);
                                                        }}
                                                    />
                                                    <FieldLabel htmlFor={field.name} className="text-sm font-normal cursor-pointer">
                                                        Remember me
                                                    </FieldLabel>
                                            </Field>
                                        )
                                    }}
                                />


                                <Field>
                                    <Button
                                        type="submit"
                                        variant="default"
                                        className="w-full"
                                        size="lg"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Signing in..." : "Sign in"}
                                    </Button>
                                </Field>
                            </FieldGroup>
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
                            <Link href="/register" className="text-primary hover:underline font-medium">
                                Sign up
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
