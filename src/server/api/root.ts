import { postRouter } from "@components/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "@components/server/api/trpc";
import { bikeRouter } from "./routers/bike";
import { reservationRouter } from "./routers/reservation";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  bike: bikeRouter,
  post: postRouter,
  reservation: reservationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
