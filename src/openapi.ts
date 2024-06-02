import type { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppConfigService } from "./framework/config/appconfig.service";

export function setupSwagger(app: INestApplication) {
  let configService = app.get(AppConfigService);
  let config = configService.c.swagger;

  const documentConfig = new DocumentBuilder()
    .setTitle(config.docTitle)
    .setDescription(config.docDescription)
    .setVersion(config.docVersion)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig, {
    operationIdFactory: (_controllerKey, methodKey) => methodKey
  });

  SwaggerModule.setup("docs", app, document, {
    customSiteTitle: config.siteTitle,
  });
}

/*
export const setupSwagger = async (app: INestApplication) => {
  const configService = app.get(ConfigService);
  const swaggerConfig = configService.get('swagger');

  const config = new DocumentBuilder()
    .setTitle(swaggerConfig.docTitle)
    .setDescription(swaggerConfig.docDescription)
    .setVersion(swaggerConfig.docVersion)
    .addBearerAuth()
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  // await SwaggerModule.loadPluginMetadata(metadata);

  const document = SwaggerModule.createDocument(app, config, options);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
      // defaultModelsExpandDepth: -1,
    },
    customSiteTitle: swaggerConfig.siteTitle,
  };

  SwaggerModule.setup('docs', app, document, customOptions);
};



*/
