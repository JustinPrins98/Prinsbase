// /trpc/init.ts
import { initTRPC, TRPCError } from '@trpc/server'
import { cache } from 'react'
import type { PrismaClient } from '@/generated/prisma'
import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

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
export const protectedProcedure = baseProcedure.use(async ({
  ctx, next }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Unauthorized"
      })
    }

    return next({ctx: {...ctx, auth: session}});
  })
