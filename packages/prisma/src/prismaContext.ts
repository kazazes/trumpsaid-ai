import { BasePrismaOptions } from "prisma-binding";
import { Prisma } from "./generated/prisma";

export interface IPrismaOptions extends BasePrismaOptions {
  typeDefs: string;
}

export const prismaEndpoint =
  process.env.PRISMA_ENDPOINT +
  (process.env.NODE_ENV === "production" ? "production" : "development");

const prismaOptions: IPrismaOptions = {
  typeDefs: __dirname + "/../prisma.graphql",
  secret: process.env.PRISMA_SECRET,
  endpoint: prismaEndpoint
};

const prismaContext = new Prisma(prismaOptions);

export default prismaContext;
