// /trpc/routers/_app.ts
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init'

export const appRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(({ ctx }) => {
  


    return ctx.prisma.user.findMany({
      where: {
        id: ctx.auth.user.id,
      },
    });
  }),
})

export type AppRouter = typeof appRouter
