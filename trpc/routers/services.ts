import {z} from "zod";
import {protectedProcedure, publicProcedure, createTRPCRouter} from "../init"
import {categories, profiles, reviews, services} from "@/lib/db/schema";
import {eq, desc, sql, inArray} from "drizzle-orm";

export const servicesRouter = createTRPCRouter({
    list: publicProcedure.query( async ({ctx}) => {
        return await ctx.db.select().from(services).where(
            eq(services.isActive, 1)
        ).orderBy(desc(services.createdAt))
    }),

    byCategory: publicProcedure
        .input(z.object({slug: z.string()}))
        .query(async ({ctx, input}) => {
            // Obtenemos la categoría
            const category = await ctx.db.query.categories.findFirst({
                where: eq(categories.slug, input.slug),
            });
            if (!category) return [];

            // Servicios + perfil del vendedor
            const servicesWithAuthors = await ctx.db.query.services.findMany({
                where: eq(services.categoryId, category.id),
                columns: {
                    id: true,
                    title: true,
                    description: true,
                    price: true,
                    rating: true,
                    reviewsCount: true,
                    sellerId: true,
                    createdAt: true,
                },
            });

            // Traemos los perfiles
            const sellerIds = servicesWithAuthors.map(s => s.sellerId);
            const profilesMap = Object.fromEntries(
                (await ctx.db.query.profiles.findMany({
                    where: inArray(profiles.id, sellerIds),
                    columns: {
                        id: true,
                        displayName: true,
                        avatarUrl: true,
                    },
                })).map(p => [p.id, p])
            );

            // Merge servicios con info del autor
            return servicesWithAuthors.map(s => ({
                id: s.id,
                title: s.title,
                description: s.description,
                price: s.price,
                rating: s.rating,
                reviewsCount: s.reviewsCount,
                authorName: profilesMap[s.sellerId]?.displayName,
                authorImage: profilesMap[s.sellerId]?.avatarUrl,
                createdAt: s.createdAt,
            }));
        }),


    count: publicProcedure.query(async ({ctx}) => {
        const result = await ctx.db
            .select({ count: sql<number>`count(*)` })
            .from(services);

        return result[0].count;
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
    }),

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