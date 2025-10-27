// /trpc/routers/_app.ts
import { inngest } from '@/inngest/client';
import { createTRPCRouter, protectedProcedure } from '../init'
import { TRPCError } from '@trpc/server';
// Google Generative AI


export const appRouter = createTRPCRouter({
  testAi: protectedProcedure.mutation(async () => {
    // throw new TRPCError({ code: "BAD_REQUEST", message: "Something went wrong" })

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
