"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {Google} from "@/components/ui/svgs/google";
import {GithubLight} from "@/components/ui/svgs/githubLight";
import {GithubDark} from "@/components/ui/svgs/githubDark";

import {toast} from "sonner"

import {Zap, Eye, EyeOff} from "lucide-react";
import { useRouter } from "next/navigation";
import {useTheme} from "next-themes"

import * as z from "zod"
import {useForm} from "@tanstack/react-form";
import {authClient} from "@/lib/auth/auth-client";
import {Field, FieldDescription, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";

const registerSchema = z.object({
    fullName: z
        .string()
        .min(3, "Bug title must be at least 3 characters.")
        .max(32, "Bug title must be at most 32 characters."),
    email: z
        .email(""),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters."),
    terms: z.boolean().refine(v => v === true, {
        message: "Debes aceptar para continuar",
    }),
})

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {theme} = useTheme();

    const form = useForm({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            terms: false
        },
        validators: {
            onSubmit: registerSchema
        },
        onSubmit: async ({ value }) => {

            setIsLoading(true)

            if(!value.terms) {
                toast.error("accept the terms and conditions to continue.")
                setIsLoading(false)
                return
            }

            const {data, error} = await authClient.signUp.email({
                name: value.fullName,
                email: value.email,
                password: value.password
            })

            setIsLoading(false)

            if (error) return

            router.push("/dashboard")

        }
    });

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
                        <CardTitle className="text-2xl">Create your account</CardTitle>
                        <CardDescription>
                            Join thousands of developers building with DevHub
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form id={"register-form"} className="space-y-4" onSubmit={(e) => {
                            e.preventDefault();
                            form.handleSubmit()
                        }}>
                            <FieldGroup>
                                <form.Field
                                    name={"fullName"}
                                    children={(field) => {
                                        const isInvalid =
                                            field.state.meta.isTouched && !field.state.meta.isValid
                                        return (
                                            <Field>
                                                <FieldLabel htmlFor={field.name}>Full name</FieldLabel>
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    type="text"
                                                    placeholder="John Doe"
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    aria-invalid={isInvalid}
                                                    required
                                                    autoComplete={"off"}
                                                />
                                                {isInvalid && (
                                                    <FieldError errors={field.state.meta.errors} />
                                                )}
                                            </Field>
                                        )
                                    }}
                                    />
                                <form.Field
                                    name={"email"}
                                    children={(field) => {
                                        const isInvalid =
                                            field.state.meta.isTouched && !field.state.meta.isValid
                                        return (
                                            <Field>
                                                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    type="text"
                                                    placeholder="John Doe"
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    aria-invalid={isInvalid}
                                                    required
                                                    autoComplete={"off"}
                                                />
                                                {isInvalid && (
                                                    <FieldError errors={field.state.meta.errors} />
                                                )}
                                            </Field>
                                        )
                                    }}
                                />
                                <form.Field
                                    name={"password"}
                                    children={(field) => {
                                        const isInvalid =
                                            field.state.meta.isTouched && !field.state.meta.isValid
                                        return (
                                            <Field>
                                                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                                <div className="relative">
                                                    <Input
                                                        id={field.name}
                                                        name={field.name}
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Create a strong password"
                                                        value={field.state.value}
                                                        onBlur={field.handleBlur}
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                        aria-invalid={isInvalid}
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
                                                <FieldDescription>
                                                    Must be at least 8 characters with a number and special character
                                                </FieldDescription>
                                                {isInvalid && (
                                                    <FieldError errors={field.state.meta.errors} />
                                                )}
                                            </Field>
                                        )
                                    }}
                                />
                                <form.Field
                                    name={"terms"}
                                    children={(field) => {
                                        const isInvalid =
                                            field.state.meta.isTouched && !field.state.meta.isValid
                                        return (
                                            <Field orientation={"horizontal"}>
                                                <Checkbox
                                                    id={field.name}
                                                    name={field.name}
                                                    checked={field.state.value}
                                                    onCheckedChange={(value) => {
                                                        field.handleChange(!!value);
                                                    }}
                                                />
                                                <div className="flex items-start gap-2">
                                                    <FieldLabel htmlFor={field.name} className="text-sm font-normal cursor-pointer leading-relaxed">
                                                        I agree to the{" "}
                                                        <Link href="/terms" className="text-primary hover:underline">
                                                            Terms of Service
                                                        </Link>{" "}
                                                        and{" "}
                                                        <Link href="/privacy" className="text-primary hover:underline">
                                                            Privacy Policy
                                                        </Link>
                                                    </FieldLabel>
                                                </div>
                                            </Field>
                                        )
                                    }}
                                />
                            </FieldGroup>

                            <Button
                                type="submit"
                                variant="default"
                                className="w-full"
                                size="lg"
                                disabled={isLoading}
                            >
                                {isLoading ? "Creating account..." : "Create account"}
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
                            Already have an account?{" "}
                            <Link href="/auth/login" className="text-primary hover:underline font-medium">
                                Sign in
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
