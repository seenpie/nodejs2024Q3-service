import { Module } from "@nestjs/common";
import { ExceptionFilterService } from "@/exception-filter/exception-filter.service";
import { LoggingModule } from "@/logging/logging.module";

@Module({
  imports: [LoggingModule],
  providers: [ExceptionFilterService],
  exports: [ExceptionFilterService],
})
export class ExceptionFilterModule {}
