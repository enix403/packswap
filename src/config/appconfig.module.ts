import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { loadAppConfig, validateEnv } from "./loader";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadAppConfig],
      validate: validateEnv
    }),
  ],
})
export class AppConfigModule {}
