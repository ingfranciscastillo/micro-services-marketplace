import {z} from "zod";
import {protectedProcedure, publicProcedure, createTRPCRouter} from "../init"
import {categories, profiles, reviews, services} from "@/lib/db/schema";
import {eq, desc, sql, or, lte, ilike, gte, and} from "drizzle-orm";

export const servicesRouter = createTRPCRouter({
    getAll: publicProcedure
        .input(
            z.object({
                page: z.number().min(1).default(1),
                limit: z.number().min(1).max(50).default(12),
                // Filtros opcionales
                categoryId: z.string().nullish(),
                minPrice: z.number().nullish(),
                maxPrice: z.number().nullish(),
                minRating: z.number().nullish(),
                search: z.string().nullish(),
            })
        )
        .query(async ({ ctx, input }) => {
            const { page, limit, categoryId, minPrice, maxPrice, minRating, search } = input;
            const offset = (page - 1) * limit;

            // Construir condiciones WHERE
            const conditions = [];

            if (categoryId) {
                conditions.push(eq(services.categoryId, categoryId));
            }

            if (minPrice !== null && minPrice !== undefined) {
                conditions.push(gte(services.price, minPrice));
            }

            if (maxPrice !== null && maxPrice !== undefined) {
                conditions.push(lte(services.price, maxPrice));
            }

            if (search) {
                conditions.push(
                    or(
                        ilike(services.title, `%${search}%`),
                        ilike(services.description, `%${search}%`)
                    )
                );
            }

            const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

            // 1️⃣ Total count con filtros
            const [{ count }] = await ctx.db
                .select({ count: sql<number>`COUNT(DISTINCT ${services.id})` })
                .from(services)
                .leftJoin(reviews, eq(reviews.serviceId, services.id))
                .where(whereClause);

            // 2️⃣ Paginated items con filtros
            const items = await ctx.db
                .select({
                    id: services.id,
                    title: services.title,
                    description: services.description,
                    price: services.price,
                    categoryId: services.categoryId,
                    createdAt: services.createdAt,
                    authorName: profiles.displayName,
                    authorImage: profiles.avatarUrl,
                    reviewCount: sql<number>`COUNT(${reviews.id})`,
                    rating: sql<number>`COALESCE(AVG(${reviews.rating}), 0)`,
                })
                .from(services)
                .leftJoin(profiles, eq(services.sellerId, profiles.id))
                .leftJoin(reviews, eq(reviews.serviceId, services.id))
                .where(whereClause)
                .groupBy(
                    services.id,
                    profiles.displayName,
                    profiles.avatarUrl
                )
                // Filtro de rating después del GROUP BY
                .having(
                    minRating ? gte(sql`COALESCE(AVG(${reviews.rating}), 0)`, minRating) : undefined
                )
                .orderBy(desc(services.createdAt))
                .limit(limit)
                .offset(offset);

            return {
                items,
                total: Number(count),
                page,
                totalPages: Math.ceil(Number(count) / limit),
            };
        }),

    byCategory: publicProcedure
        .input(
            z.object({
                slug: z.string(),
                page: z.number().min(1).default(1),
                limit: z.number().min(1).max(30).default(12),
            })
        )
        .query(async ({ctx, input}) => {
            const {slug, page, limit} = input;
            const offset = (page - 1) * limit;

            // 1️⃣ categoría
            const category = await ctx.db.query.categories.findFirst({
                where: eq(categories.slug, slug),
                columns: {id: true},
            });

            if (!category) {
                return {
                    items: [],
                    total: 0,
                    page,
                    totalPages: 0,
                };
            }

            const [{count}] = await ctx.db
                .select({count: sql<number>`COUNT(*)`})
                .from(services)
                .where(eq(services.categoryId, category.id));

            const items = await ctx.db
                .select({
                    id: services.id,
                    title: services.title,
                    description: services.description,
                    price: services.price,
                    rating: services.rating,
                    reviewsCount: services.reviewsCount,
                    createdAt: services.createdAt,
                    authorName: profiles.displayName,
                    authorImage: profiles.avatarUrl,
                })
                .from(services)
                .leftJoin(profiles, eq(services.sellerId, profiles.id))
                .where(eq(services.categoryId, category.id))
                .orderBy(desc(services.createdAt))
                .limit(limit)
                .offset(offset);

            return {
                items,
                total: Number(count),
                page,
                totalPages: Math.ceil(Number(count) / limit),
            };
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