import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  //   return new PrismaClient();
  const client = new PrismaClient({
    log: ["query", "info", "warn", "error"], // Enable detailed logging
  });

  // Test the database connection on client creation
  client
    .$connect()
    .then(() => {
      console.log("Connected to the database successfully");
    })
    .catch((error) => {
      console.error("Failed to connect to the database", error);
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
