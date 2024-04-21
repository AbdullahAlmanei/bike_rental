import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export interface bikeInterface {
  id: string,
  model: string,
  color: string,
  available: boolean,
  rating: number,
  lat: number,
  lng: number,
}

export const bikeRouter = createTRPCRouter({
  create: protectedProcedure.input(z.object({ color: z.string(), model: z.string(), rating: z.number().optional(), lat: z.number(), lng: z.number() }))
  .mutation(async ({ ctx, input }) => {
    return ctx.db.bike.create({
        data: {
        color: input.color,
        model: input.model,
        rating: input.rating,
        lat: input.lat,
        lng: input.lng,

        }
  })}),
  getAll: publicProcedure.query(({ctx}) => {
    return ctx.db.bike.findMany();
  }),
  getById: publicProcedure.input(z.object({bikeId: z.string()})).query( async ({ctx, input}) => {
    return await ctx.db.bike.findUnique(
      {
        where: {
          id: input.bikeId
        }
      }
    )
  }),
});

