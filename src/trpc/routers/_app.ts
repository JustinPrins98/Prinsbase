// /trpc/routers/_app.ts
import { inngest } from '@/inngest/client';
import { createTRPCRouter, protectedProcedure } from '../init'

export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.workflow.findMany();

  }),
  createWorkflow: protectedProcedure.mutation(async ({ ctx }) => {

    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "admin@mail.com"
      }
    })


    return { succes: true, message: "Job queeed" }
  }),
});

export type AppRouter = typeof appRouter
