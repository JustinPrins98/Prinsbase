// /trpc/routers/_app.ts
import { inngest } from '@/inngest/client';
import { createTRPCRouter, protectedProcedure } from '../init'
// Google Generative AI


export const appRouter = createTRPCRouter({
  testAi: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "execute/ai",
    })

    return { succes: true, message: "Job queeed" }
  }),

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
