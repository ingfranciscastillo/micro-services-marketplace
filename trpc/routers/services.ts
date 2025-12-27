import {z} from "zod";
import {protectedProcedure, publicProcedure, createTRPCRouter} from "../init"
import {categories, profiles, reviews, services} from "@/lib/db/schema";
import {eq, desc, sql, inArray} from "drizzle-orm";

export const servicesRouter = createTRPCRouter({
    getAll: publicProcedure.input(
        z.object({
            limit: z.number().min(1).max(50).default(24),
            offset: z.number().min(0).default(0),
        })
    ).query( async ({ctx, input}) => {
        const { limit, offset } = input;

        return await ctx.db.select({
            id: services.id,
            title: services.title,
            description: services.description,
            price: services.price,
            createdAt: services.createdAt,

            authorName: profiles.displayName,
            authorImage: profiles.avatarUrl,

            reviewCount: sql<number>`COUNT(${reviews.id})`,
            rating: sql<number>`COALESCE(AVG(${reviews.rating}), 0)`,
        }).from(services)
            .leftJoin(profiles, eq(services.sellerId, profiles.id))
            .leftJoin(reviews, eq(reviews.serviceId, services.id))
            .groupBy(
                services.id,
                profiles.displayName,
                profiles.avatarUrl
            )
            .orderBy(desc(services.createdAt))
            .limit(limit)
            .offset(offset)

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

})