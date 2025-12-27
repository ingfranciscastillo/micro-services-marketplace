import {createTRPCRouter, protectedProcedure, publicProcedure} from "../init";
import {categories, services} from "@/lib/db/schema";
import {eq, sql, desc} from "drizzle-orm";
import {z} from "zod";

export const categoriesRouter = createTRPCRouter({

    // Todas las categorias
    getAll: publicProcedure.query(async ({ctx}) => {
        return ctx.db
            .select({
                id: categories.id,
                name: categories.name,
                slug: categories.slug,
                description: categories.description,
                icon: categories.icon,
                color: categories.color,
                servicesCount: sql<number>`COUNT(
                ${services.id}
                )`,
            })
            .from(categories)
            .leftJoin(services, eq(services.categoryId, categories.id))
            .groupBy(categories.id)
            .orderBy(categories.name);
    }),

    // Obtener por ID
    getById: publicProcedure.input(
        z.object({
            id: z.string()
        })
    ).query(async ({ctx, input}) => {
        return ctx.db
            .select({
                id: categories.id,
                name: categories.name,
                slug: categories.slug,
                description: categories.description,
                icon: categories.icon,
                color: categories.color,
                servicesCount: sql<number>`COUNT(
                ${services.id}
                )`,
            })
            .from(categories)
            .leftJoin(services, eq(services.categoryId, categories.id))
            .where(eq(categories.id, input.id))
            .groupBy(categories.id)
            .limit(1);
    }),

    // Populares
    getPopular: publicProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(20).default(6),
            })
        )
        .query(async ({ctx, input}) => {
            return ctx.db
                .select({
                    id: categories.id,
                    name: categories.name,
                    slug: categories.slug,
                    description: categories.description,
                    icon: categories.icon,
                    color: categories.color,
                    servicesCount: sql<number>`COUNT(
                    ${services.id}
                    )`,
                })
                .from(categories)
                .leftJoin(services, eq(services.categoryId, categories.id))
                .groupBy(categories.id)
                .orderBy(desc(sql`COUNT(
                ${services.id}
                )`))
                .limit(input.limit);
        }),

});
