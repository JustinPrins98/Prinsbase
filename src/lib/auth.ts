import { checkout, polar, portal } from "@polar-sh/better-auth";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { polarClient } from "./polar";


export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "ecb64943-57d9-4c24-ba17-865f57b04207",
              slug: "Prinsbase-Pro",
            }
          ],
          successUrl: process.env.POLAR_SUCCES_URL,
          authenticatedUsersOnly: true,
        }),
        portal()
      ]
    })
  ]
});