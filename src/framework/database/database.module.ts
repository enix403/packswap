import { Global, Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AppConfigService } from "../config/appconfig.service";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      // imports: [ConfigModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService): TypeOrmModuleOptions => {
        let dbConfig = configService.c.database;
        return {
          type: "postgres",
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.name,
          applicationName: "PackSwap",
          entities: [],
          synchronize: true,
          autoLoadEntities: true,
          dropSchema: false
        };
      }
    })
  ],
  exports: []
})
export class DatabaseModule {}
