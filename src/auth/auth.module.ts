import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "@/user/user.module";
import { TokenModule } from "@/token/token.module";
import { AuthGuard } from "@/auth/guards/auth.guard";
import { LoggingModule } from "@/logging/logging.module";

@Module({
  imports: [UserModule, TokenModule, LoggingModule],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
