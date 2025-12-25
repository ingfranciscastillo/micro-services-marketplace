"use client";

// React things
import { ReactNode } from "react";

// Tanstack query
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Theme provider
import { ThemeProvider } from "@/components/theme-provider";

// Toaster
import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/client";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <TRPCReactProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>

      <ReactQueryDevtools />
    </TRPCReactProvider>
  );
}
