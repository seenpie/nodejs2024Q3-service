import { DbService } from "@/db/db.service";
import { Module } from "@nestjs/common";

@Module({
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
