import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "@/app.controller";
import { AppService } from "@/app.service";
import { UserModule } from "./user/user.module";
import { DbModule } from "@/db/db.module";

@Module({
  imports: [ConfigModule.forRoot(), UserModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
