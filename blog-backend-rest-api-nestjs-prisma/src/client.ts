// prisma/client.ts

import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

export const getPrisma = (schema?: string) => {
  if (!prisma || schema) {
    // If prisma is not yet initialized or schema is provided, create a new instance.
    prisma = new PrismaClient({
      // Update the connection string with the appropriate database name or other parameters.
      datasources: {
        db: {
          url: process.env.DATABASE_URL + (schema ? `/${schema}` : ''), // Adjust the connection string based on your database provider.
        },
      },
    });
  }

  return prisma;
};
