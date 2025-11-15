// /trpc/init.ts
import { initTRPC, TRPCError } from '@trpc/server'
import { cache } from 'react'
import type { PrismaClient } from '@/generated/prisma'
import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { polarClient } from '@/lib/polar'

export type TRPCContext = {
  prisma: PrismaClient
  userId: string | null
}

export const createTRPCContext = cache(async (): Promise<TRPCContext> => {
  return {
    prisma,
    userId: 'user_123', // zet hier je echte auth-context neer wanneer nodig
  }
})

// tRPC init met context-type
const t = initTRPC.context<TRPCContext>().create()

export const createTRPCRouter = t.router
export const createCallerFactory = t.createCallerFactory
export const baseProcedure = t.procedure

export const protectedProcedure = baseProcedure.use(async (opts) => {
  const { ctx, next } = opts;

  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Not authenticated"
    });
  }

  return next({
    ctx: {
      ...ctx,
      auth: session,
    },
  });
});

export const premiumProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  const customer = await polarClient.customers.getStateExternal({
    externalId: ctx.auth.user.id,
  });

  if (
    !customer.activeSubscriptions || customer.activeSubscriptions.length === 0
  ) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Active subscription required",
    })
  }

  return next({ ctx: { ...ctx, customer } })
})
