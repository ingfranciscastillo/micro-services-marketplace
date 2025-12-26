import { createTRPCRouter, publicProcedure } from "../init";
import { categories } from "@/lib/db/schema";

export const categoriesRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(categories)
      .orderBy(categories.name);
  }),
});
