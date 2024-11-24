import { Injectable, LoggerService, LogLevel } from "@nestjs/common";
import * as path from "node:path";
import { ConfigService } from "@nestjs/config";
import { writeToFile } from "@/features/logging/helpers/write-to-file";
import { EnvAliases } from "@/common/enums/env-alliases.enum";
import { getLogLevelList } from "@/features/logging/helpers/get-log-level-list";
import { createLogMessage } from "@/features/logging/helpers/create-log-message";

@Injectable()
export class LoggingService implements LoggerService {
  private logFile = path.join(__dirname, "..", "logs", "app.log");
  private errorLogFile = path.join(
    __dirname,
    "..",
    "logs",
    "error",
    "app-error.log",
  );
  private readonly activeLogLevels: LogLevel[];

  constructor(private readonly configService: ConfigService) {
    const logLevel = this.configService.get(EnvAliases.LOG_LEVEL, "warn");
    this.activeLogLevels = getLogLevelList(logLevel);
  }

  private shouldLog(level: LogLevel) {
    return this.activeLogLevels.includes(level);
  }

  private write(msg: string, context: string, level: LogLevel) {
    if (!this.shouldLog(level)) return;

    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${context ?? "App"}] ${msg}\n`;

    writeToFile(
      level === "error" ? this.errorLogFile : this.logFile,
      logMessage,
      +this.configService.get(EnvAliases.LOG_MAX_SIZE, "104857"),
    );
  }

  logRequest(request: any): void {
    const logMessage = createLogMessage("request", { data: request });
    this.log(logMessage);
  }

  logResponse(response: any, statusCode: number, context?: string): void {
    const logMessage = createLogMessage("response", {
      data: response,
      statusCode,
    });

    if (statusCode >= 500) {
      this.error(logMessage, undefined, context);
    } else if (statusCode >= 400) {
      this.warn(logMessage, context);
    } else {
      this.log(logMessage, context);
    }
  }

  log(message: string, context?: string): void {
    this.write(`LOG: ${message}`, context, "log");
  }

  error(message: string, trace?: string, context?: string): void {
    this.write(`ERROR: ${message}\nTrace: ${trace}`, context, "error");
  }

  warn(message: string, context?: string): void {
    this.write(`WARNING: ${message}`, context, "warn");
  }

  debug(message: string, context?: string): void {
    this.write(`DEBUG: ${message}`, context, "debug");
  }

  verbose(message: string, context?: string): void {
    this.write(`VERBOSE: ${message}`, context, "verbose");
  }
}
