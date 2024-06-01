import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UploadedFile
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { AuthService } from "./auth.service";
import { LoginCredentialsDto, LoginResult } from "./dto/login.dto";
import { ActiveUser, UseAuth } from "@/framework/common/guards";
import { AcceptImageUpload, ImageService } from "@/image/image.service";
import { sendMessage } from "@/framework/common/response-creators";
import { Repository } from "typeorm";
import { UserProfileImage } from "./entities/user-profile-image.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly imageService: ImageService,
    @InjectRepository(UserProfileImage)
    private readonly profileImageRepo: Repository<UserProfileImage>
  ) {}

  @Post("sign-up")
  public async signUp(@Body() userDto: CreateUserDto): Promise<User> {
    let user = await this.authService.createUser(userDto);
    return user;
  }

  @Post("login")
  public async login(@Body() dto: LoginCredentialsDto): Promise<LoginResult> {
    return await this.authService.login(dto);
  }

  @Get("me")
  @UseAuth()
  public async getMe(@ActiveUser("id") userId: string): Promise<User> {
    return this.authService.getUserRepo().findOneOrFail({
      where: { id: userId },
      relations: {
        profileImage: true
      }
    });
  }

  @Post("me/upload-image")
  @UseAuth()
  @AcceptImageUpload()
  public async uploadImage(
    @ActiveUser("id") userId: string,
    @UploadedFile() imageFile: Express.Multer.File
  ) {
    let repo = this.authService.getUserRepo();

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

  @Delete("me/remove-image")
  @UseAuth()
  public async remoevImage(
    @ActiveUser() user: User,
  ) {
    await this.profileImageRepo.delete({ user });
    return sendMessage("Removed successfully");
  }
}
