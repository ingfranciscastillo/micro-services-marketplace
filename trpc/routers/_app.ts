import { createCallerFactory, createTRPCRouter } from "@/trpc/init";
import {categoriesRouter} from "@/trpc/routers/categories";
import {servicesRouter} from "@/trpc/routers/services";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    categories: categoriesRouter,
    services: servicesRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);