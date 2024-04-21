import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const reservationRouter = createTRPCRouter({
  create: protectedProcedure.input(z.object({ startDate: z.date(), endDate: z.date(), userId: z.string(), bikeId: z.string()  }))
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.reservation.create({
        data: {
        startDate: input.startDate,
        endDate: input.endDate,
        userId: input.userId,
        bikeId: input.bikeId,        
        }
  })}),
  getBikeReservations: publicProcedure.input(z.object({bikeId: z.string()})).query(async ({ctx, input}) => {
    return await ctx.db.reservation.findMany({
      where: {
        bikeId: input.bikeId
      },
    });
  }),
  getUserReservations: protectedProcedure.input(z.object({userId: z.string()})).query(async ({ctx, input}) => {      // This is possibly a security risk...
    return await ctx.db.reservation.findMany({
      where: {
        userId: input.userId
      },
    });
  }),
});

