import { betterAuth, type BetterAuthOptions } from "better-auth";
import { headers } from "next/headers";
import { cache } from "react";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db/index"; // your drizzle instance
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
        cookieCache: {
        enabled: true,
        maxAge: 5 * 60, // Cache duration in seconds
        },
    },
    rateLimit: {
        window: 60, // time window in seconds
        max: 5, // max requests in the window
    },
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        },
        microsoft: { 
            clientId: process.env.MICROSOFT_CLIENT_ID as string, 
            clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string, 
        },
    },
    plugins: [nextCookies()]
} satisfies BetterAuthOptions);

export const getServerSession = cache(
  async () =>
    await auth.api.getSession({
      headers: await headers(),
    }),
);

export type Session = typeof auth.$Infer.Session;
export type AuthUserType = Session["user"];