type LogMessage = "request" | "response";
type LogMessagePayload = {
  data: any;
  statusCode?: number;
};

export function createResponseLogMessage({
  data,
  statusCode,
}: LogMessagePayload): string {
  return `Server response: [status code: ${statusCode}] [response:${JSON.stringify(
    data,
  )}]`;
}

export function createRequestLogMessage({ data }: LogMessagePayload): string {
  const { url, body, query, method } = data;
  return `Client request: [method:${method}] [url:${url}] [body:${JSON.stringify(
    body,
  )}] [query:${JSON.stringify(query)}]`;
}

export function createLogMessage(type: LogMessage, payload: LogMessagePayload) {
  switch (type) {
    case "request":
      return createRequestLogMessage(payload);
    default:
      return createResponseLogMessage(payload);
  }
}
