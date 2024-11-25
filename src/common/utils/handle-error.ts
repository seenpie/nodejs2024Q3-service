import { Prisma } from "@prisma/client";
import { BadRequestException } from "@nestjs/common";

function handlePrismaP2003(error: Prisma.PrismaClientKnownRequestError) {
  const fieldName = error.meta.field_name as string;
  if (fieldName.includes("albumId")) {
    throw new BadRequestException("album with albumId doesn't exist");
  }

  if (fieldName.includes("artistId")) {
    throw new BadRequestException("artist with artistId doesn't exist");
  }

  throw new Error("error from handlePrismaP2003, unknown includes chars");
}

function handlePrismaError(error: Prisma.PrismaClientKnownRequestError) {
  if (error.code === "P2003") {
    return handlePrismaP2003(error);
  }

  throw new Error("error from handlePrismaError, unknown prisma error.code");
}

export function handleError(error: any) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return handlePrismaError(error);
  }

  throw new Error("error from handleError, unknown instanceof error");
}
