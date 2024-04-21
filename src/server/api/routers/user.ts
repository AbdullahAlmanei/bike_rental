import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
    getById: publicProcedure.input(z.object({userId: z.string()})).query( async ({ctx, input}) => {
      return await ctx.db.user.findUnique(
        {
          where: {
            id: input.userId
          }
        }
      )
    }),  
  });
  
  