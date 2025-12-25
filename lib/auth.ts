import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db/index"; // your drizzle instance
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        },
        microsoft: { 
            clientId: process.env.MICROSOFT_CLIENT_ID as string, 
            clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string, 
            // Optional
            tenantId: 'common', 
            authority: "https://login.microsoftonline.com", // Authentication authority URL
            prompt: "select_account", // Forces account selection
        },
    },
    plugins: [nextCookies()]
});