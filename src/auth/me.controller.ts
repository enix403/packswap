import {
  Controller,
  Delete,
  Get,
  Post,
  UploadedFile
} from "@nestjs/common";
import { User } from "./entities/user.entity";
import { ActiveUser, UseAuth } from "@/framework/common/guards";
import { AcceptImageUpload, ImageService } from "@/image/image.service";
import { sendMessage } from "@/framework/common/response-creators";
import { Repository } from "typeorm";
import { UserProfileImage } from "./entities/user-profile-image.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Me')
@Controller("me")
export class MeController {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly imageService: ImageService,
    @InjectRepository(UserProfileImage)
    private readonly profileImageRepo: Repository<UserProfileImage>
  ) {}

  @Get()
  @UseAuth()
  public async getMe(@ActiveUser("id") userId: string): Promise<User> {
    return this.userRepo.findOneOrFail({
      where: { id: userId },
      relations: {
        profileImage: true
      }
    });
  }

  @Post("profile-image")
  @UseAuth()
  @AcceptImageUpload()
  public async uploadImage(
    @ActiveUser("id") userId: string,
    @UploadedFile() imageFile: Express.Multer.File
  ) {
    let repo = this.userRepo;

    let user = await repo.findOneOrFail({
      where: { id: userId },
      relations: { profileImage: true }
    });

    let image = await this.imageService.saveImage(imageFile, { user });

    if (user.profileImage) {
      user.profileImage.image = image;
    } else {
      user.profileImage = this.profileImageRepo.create({ image });
    }

    await repo.save(user);

    return sendMessage("Uploaded successfully");
  }

  @Delete("profile-image")
  @UseAuth()
  public async remoevImage(
    @ActiveUser() user: User,
  ) {
    await this.profileImageRepo.delete({ user });
    return sendMessage("Removed successfully");
  }
}
