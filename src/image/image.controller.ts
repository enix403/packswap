import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile
} from "@nestjs/common";
import { ActiveUser, UseAuth } from "@/framework/common/guards";
import { User } from "@/auth/entities/user.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Image } from "./entities/image.entity";

@Controller("images")
export class ImagesController {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepo: Repository<Image>
  ) {}

  // @Post("upload")
  // @UseAuth([], { allowPublic: true })
  // @UseInterceptors(
  //   FileInterceptor("file", {
  //     storage: diskStorage({
  //       destination: "./uploaded-files",
  //       filename: function (req, file, callback) {
  //         // TOOD: use nanoid
  //         callback(null, `${Date.now()}-${file.originalname}`);
  //       }
  //     })
  //   })
  // )
  // public async upload(
  //   @ActiveUser() user: User | null,
  //   @UploadedFile() file: Express.Multer.File
  // ) {
  //   let existingImage = await this.imageRepo.findOne({
  //     where: { user: { id: user.id } }
  //   });

  //   let url = file.filename;

  //   if (existingImage) {
  //     existingImage.url = url;
  //   } else {
  //     let existingImage = new Image();
  //     existingImage.url = file.filename;
  //     existingImage.user = user;
  //   }

  //   await this.imageRepo.save(existingImage!);

  //   return {
  //     message: "Uploaded Succesfully"
  //   };
  // }

  // @Delete('remove')
  // @UseAuth()
  // public async remove(@ActiveUser() user: User) {
  //   await this.imageRepo.delete({
  //     user: { id: user.id }
  //   });

  //   return {
  //     message: "Removed Succesfully"
  //   };
  // }
}
