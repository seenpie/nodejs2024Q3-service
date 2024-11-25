import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { LoggingService } from "./logging.service";
import { tap } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<any> {
    return next.handle().pipe(
      tap((response) => {
        const { statusCode } = context.switchToHttp().getResponse();
        this.loggingService.logResponse(response, statusCode);
      }),
    );
  }
}
