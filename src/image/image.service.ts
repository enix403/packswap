import { Injectable, UseInterceptors } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Image } from "./entities/image.entity";
import { Repository } from "typeorm";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

export const AcceptImageUpload = () =>
  UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploaded-files",
        filename: function (req, file, callback) {
          // TOOD: use nanoid
          callback(null, `${Date.now()}-${file.originalname}`);
        }
      })
    })
  );

export type CreateImagePayload = Partial<
  Omit<Image, "id" | "url" | "createdAt" | "updatedAt">
>;

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepo: Repository<Image>
  ) {}

  public async saveImage(
    file: Express.Multer.File,
    meta: CreateImagePayload,
    save: boolean = true
  ): Promise<Image> {
    let image = this.imageRepo.create({
      url: file.filename,
      user: meta.user,
      kind: meta.kind || "default"
    });

    if (save) {
      image = await this.imageRepo.save(image);
    }

    return image;
  }

  getRepo(): Repository<Image> {
    return this.imageRepo;
  }
}
