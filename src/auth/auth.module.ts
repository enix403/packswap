import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { AppConfigService } from "@/framework/config/appconfig.service";
import { ImageModule } from "@/image/image.module";
import { UserProfileImage } from "./entities/user-profile-image.entity";

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => {
        return {
          secret: configService.c.jwt.secret
          // signOptions: {},
          // verifyOptions: {}
        };
      }
    }),
    TypeOrmModule.forFeature([User, UserProfileImage]),
    ImageModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
