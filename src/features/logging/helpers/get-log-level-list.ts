import { LogLevel } from "@nestjs/common";

export function getLogLevelList(logLevel: LogLevel): LogLevel[] {
  const logLevelMap = new Map<LogLevel, LogLevel[]>([
    ["log", ["log"]],
    ["error", ["log", "error"]],
    ["warn", ["log", "error", "warn"]],
    ["debug", ["log", "error", "warn", "debug"]],
    ["verbose", ["log", "error", "warn", "debug", "verbose"]],
  ]);

  return logLevelMap.get(logLevel) || logLevelMap.get("warn");
}
