import {createTRPCRouter, protectedProcedure, publicProcedure} from "../init";
import {categories, services} from "@/lib/db/schema";
import {eq, sql} from "drizzle-orm";
import {z} from "zod";

export const categoriesRouter = createTRPCRouter({

  // Todas las categorias
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        description: categories.description,
        icon: categories.icon,
        color: categories.color,
        servicesCount: sql<number>`COUNT(${services.id})`,
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
  ).query(async ({ ctx, input }) => {
    return ctx.db
        .select({
          id: categories.id,
          name: categories.name,
          slug: categories.slug,
          description: categories.description,
          icon: categories.icon,
          color: categories.color,
          servicesCount: sql<number>`COUNT(${services.id})`,
        })
        .from(categories)
        .leftJoin(services, eq(services.categoryId, categories.id))
        .where(eq(categories.id, input.id))
        .groupBy(categories.id)
        .limit(1);
  }),

  // crear categoria
  create: protectedProcedure
      .input(
          z.object({
            name: z.string(),
            slug: z.string(),
            description: z.string(),
            icon: z.string().optional(),
            color: z.string().optional(),
          })
      )
      .mutation(async ({ ctx, input }) => {
        return ctx.db.
            insert(categories)
            .values({
              ...input
            }).returning()
      }),

  // Actualizar categoría
  update: protectedProcedure
      .input(
          z.object({
            id: z.string(),
            name: z.string().min(2).optional(),
            slug: z.string().min(2).optional(),
            description: z.string().optional(),
            icon: z.string(),
            color: z.string().optional(),
          })
      )
      .mutation(async ({ ctx, input }) => {
        const { id, ...data } = input;

        const [category] = await ctx.db
            .update(categories)
            .set({
              ...data,
              updatedAt: new Date(),
            })
            .where(eq(categories.id, id))
            .returning();

        return category;
      }),

  // Eliminar categoría
  delete: protectedProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ ctx, input }) => {
        await ctx.db.delete(categories).where(eq(categories.id, input.id));
        return { success: true };
      }),

});
