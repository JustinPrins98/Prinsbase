import { baseProcedure, createTRPCRouter } from '../init';
import type { PrismaClient } from '@prisma/client'; // of '@/generated/prisma'
declare const prisma: PrismaClient;



export const appRouter = createTRPCRouter({
  getUsers: baseProcedure.query(() => {
      return prisma.user.findMany();
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;