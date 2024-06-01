import { Module } from "@nestjs/common";
import { ImagesController } from "./images.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Image } from "./entities/image.entity";
import { User } from "@/auth/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Image, User])],
  controllers: [ImagesController],
  providers: []
})
export class ImagesModule {}
