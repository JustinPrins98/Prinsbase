import { PrismaClient } from "@/generated/prisma";

const globarForPrisma = global as unknown as {
    prisma: PrismaClient;
};

const prisma = globarForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    globarForPrisma.prisma = prisma;
}

export default prisma;