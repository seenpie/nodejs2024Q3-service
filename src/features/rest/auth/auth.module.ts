import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "@/features/rest/user/user.module";
import { TokenModule } from "@/features/token/token.module";
import { AuthGuard } from "@/features/rest/auth/guards/auth.guard";
import { LoggingModule } from "@/features/logging/logging.module";

@Module({
  imports: [UserModule, TokenModule, LoggingModule],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
