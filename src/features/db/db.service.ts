import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class DbService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    const favorite = await this.favorite.findFirst();

    if (!favorite) {
      await this.favorite.create({
        data: {},
      });
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
