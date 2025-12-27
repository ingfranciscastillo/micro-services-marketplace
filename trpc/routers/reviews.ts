import {z} from "zod";
import {createTRPCRouter, publicProcedure} from "@/trpc/init";
import {reviews} from "@/lib/db/schema";
import {eq} from "drizzle-orm";

export const reviewsRouter = createTRPCRouter({
    getReviews: publicProcedure
        .input(
            z.object({
                serviceId: z.uuid(),
            })
        )
        .query(async ({ ctx, input }) => {
            return ctx.db.query.reviews.findMany({
                where: eq(reviews.serviceId, input.serviceId),
                orderBy: (reviews, { desc }) => [desc(reviews.createdAt)],
            });
        }),
})