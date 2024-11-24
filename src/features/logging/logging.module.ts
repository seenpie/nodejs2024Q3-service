import { Module } from "@nestjs/common";
import { LoggingService } from "@/features/logging/logging.service";
import { LoggingInterceptor } from "./logging.interceptor";

@Module({
  providers: [LoggingService, LoggingInterceptor],
  exports: [LoggingService, LoggingInterceptor],
})
export class LoggingModule {}
