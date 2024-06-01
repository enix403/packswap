import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Image } from "./entities/image.entity";
import { User } from "@/auth/entities/user.entity";
import { ImageService } from "./image.service";

@Module({
  imports: [TypeOrmModule.forFeature([Image, User])],
  providers: [ImageService],
  exports: [ImageService]
})
export class ImageModule {}
