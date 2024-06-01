import { Module, ValidationPipe } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppConfigModule } from "./config/appconfig.module";
import { DatabaseModule } from "./database/database.module";

import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { TransformToPlainInterceptor } from "./common/transform.interceptor";
import { TypeOrmNotFoundFilter } from "./execptionfilter";
import { AuthModule } from "./auth/auth.module";
import { TravelModule } from "./travel/travel.module";
import { ImagesModule } from "./images/images.module";
import { ChatModule } from "./chat/chat.module";
import { CommentModule } from "./comment/comment.module";

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    AuthModule,
    TravelModule,
    ImagesModule,
    ChatModule,
    CommentModule
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
        // TODO: enable these based on env
        validationError: {
          target: true,
          value: true
        }
        // disableErrorMessages: true,
        // enableDebugMessages: true,
      })
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformToPlainInterceptor
    }
  ]
})
export class AppModule {}
