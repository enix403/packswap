import path from "path";

import { Module, ValidationPipe } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppConfigModule } from "@/framework/config/appconfig.module";
import { DatabaseModule } from "@/framework/database/database.module";

import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { TransformToPlainInterceptor } from "./transform.interceptor";
import { TypeOrmNotFoundFilter } from "./typeorm.execptionfilter";
import { AuthModule } from "./auth/auth.module";
import { TravelModule } from "./travel/travel.module";
import { ImageModule } from "./image/image.module";
import { ChatModule } from "./chat/chat.module";
import { ServeStaticModule } from "@nestjs/serve-static";

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'uploaded-files'),
      serveRoot: '/uploads'
    }),
    AuthModule,
    TravelModule,
    ImageModule,
    ChatModule,
  ],
  exports: [DatabaseModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: TypeOrmNotFoundFilter
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidUnknownValues: true,
        forbidNonWhitelisted: true,
        stopAtFirstError: true,
        validateCustomDecorators: false,
        transformOptions: {
          enableImplicitConversion: true
        },
        validationError: {
          target: true,
          value: true
        }
      })
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformToPlainInterceptor
    }
  ]
})
export class AppModule {}
