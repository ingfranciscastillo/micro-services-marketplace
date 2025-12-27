import { betterAuth, type BetterAuthOptions } from "better-auth";
import { headers } from "next/headers";
import { cache } from "react";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db"; // your drizzle instance
import { nextCookies } from "better-auth/next-js";
import {polar, portal, usage, webhooks} from "@polar-sh/better-auth"
import {Polar} from "@polar-sh/sdk"
import {profiles} from "@/lib/db/schema";

const polarClient = new Polar({
    accessToken: process.env.POLAR_ACCESS_TOKEN,
    server: 'sandbox'
});

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
    }),
    databaseHooks: {
        user: {
            create: {
                after: async (user) => {
                    await db.insert(profiles).values({
                        userId: user.id,
                        displayName: user.name,
                        avatarUrl: user.image,
                    })
                }
            }
        }
    },
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
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }, 
    },
    plugins: [nextCookies(), polar({
        client: polarClient,
        createCustomerOnSignUp: true,
        use: [
            portal(),
            usage(),
            webhooks({
                secret: process.env.WEBHOOK_SECRET as string,
                onPayload: (payload) => {
                    console.log(payload)
                    return Promise.resolve()
                },
                onOrderPaid: (payload) => {
                    console.log("Orden pagada:", payload)
                    return Promise.resolve()
                }
            })
        ]
    })]
} satisfies BetterAuthOptions);

export const getServerSession = cache(
  async () =>
    await auth.api.getSession({
      headers: await headers(),
    }),
);

export type Session = typeof auth.$Infer.Session;
export type AuthUserType = Session["user"];