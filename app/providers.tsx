"use client";

import {ReactNode} from "react";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/lib/query-client";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from "@/components/theme-provider"
import {Toaster} from "@/components/ui/sonner";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
                <Toaster/>
            </ThemeProvider>
            <ReactQueryDevtools/>
        </QueryClientProvider>
    );
}
