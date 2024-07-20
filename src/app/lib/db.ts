import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  const client = new PrismaClient({
    log: ["query", "info", "warn", "error"], // Enable detailed logging
  });

  return client;
};

// Global declaration to maintain a singleton PrismaClient
declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

export const db = prisma;
