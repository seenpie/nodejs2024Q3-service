import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as fs from "node:fs";
import * as path from "node:path";
import * as YAML from "yamljs";

const DEFAULT_PORT = 4000;
const docFilePath = path.join(__dirname, "../doc/api.yaml");
const swaggerServerUrl = "http://localhost:4000";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const config = new DocumentBuilder()
    .setTitle("Home Library Service")
    .setDescription("Home music library service API")
    .setVersion("1.0")
    .addServer(swaggerServerUrl)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const yamlDocument = YAML.stringify(document, 10, 2);

  fs.writeFileSync(docFilePath, yamlDocument);

  SwaggerModule.setup("doc", app, document);

  await app.listen(process.env.PORT ?? DEFAULT_PORT);
}
bootstrap();
