import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { LoggingService } from "@/features/logging/logging.service";

@Catch()
export class ExceptionFilterService implements ExceptionFilter {
  constructor(private readonly loggingService: LoggingService) {
    process.on("uncaughtException", (error) => {
      this.loggingService.error(
        `Uncaught Exception: ${error.message}`,
        error.stack,
      );
      process.exit(1);
    });

    process.on("unhandledRejection", (reason) => {
      this.loggingService.error(
        `Unhandled Rejection: ${
          reason instanceof Error ? reason.message : reason
        }`,
        reason instanceof Error ? reason.stack : "",
      );
    });
  }

  catch(exception: HttpException | any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : { statusCode: status, message: "Internal server error" };

    this.loggingService.logResponse(message, status);

    response.status(status).json(message);
  }
}
