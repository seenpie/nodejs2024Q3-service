import { Module } from "@nestjs/common";
import { ExceptionFilterService } from "@/features/exception-filter/exception-filter.service";
import { LoggingModule } from "@/features/logging/logging.module";

@Module({
  imports: [LoggingModule],
  providers: [ExceptionFilterService],
  exports: [ExceptionFilterService],
})
export class ExceptionFilterModule {}
