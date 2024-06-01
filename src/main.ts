import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppConfigService } from "./framework/config/appconfig.service";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({ origin: true });

  let configService = app.get(AppConfigService);
  let port = configService.c.port;

  await app.listen(port);
}
bootstrap();
