import {z} from "zod";
import {protectedProcedure, publicProcedure, createTRPCRouter} from "../init"
import {services} from "@/lib/db/schema";
import {eq, desc} from "drizzle-orm";

export const servicesRouter = createTRPCRouter({
    list: publicProcedure.query( async ({ctx}) => {
        return await ctx.db.select().from(services).where(
            eq(services.isActive, 1)
        ).orderBy(desc(services.createdAt))
    }),

    create: protectedProcedure.input(
        z.object({
            title: z.string(),
            description: z.string(),
            price: z.int(),
            categoryId: z.string()
        })
    )
    .mutation(async ({ctx, input}) => {

        await ctx.db.insert(services).values({
            sellerId: ctx.session.user!.id,
            categoryId: input.categoryId,
            title: input.title,
            description: input.description,
            price: input.price,
        })
    })
})