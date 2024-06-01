import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { loadAppConfig, validateEnv } from "./loader";
import { AppConfigService } from "./appconfig.service";

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//       load: [loadAppConfig],
//       validate: validateEnv
//     }),
//   ],
// })

@Global()
@Module({
  imports: [ConfigModule.forRoot({ validate: validateEnv })],
  providers: [AppConfigService],
  exports: [AppConfigService]
})
export class AppConfigModule {}
