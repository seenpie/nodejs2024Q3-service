import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/app.module";
import * as process from "node:process";

const DEFAULT_PORT = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  await app.listen(process.env.PORT ?? DEFAULT_PORT);
}
bootstrap();
