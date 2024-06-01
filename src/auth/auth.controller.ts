import { Body, Controller, Get, Post, UploadedFile } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { AuthService } from "./auth.service";
import { LoginCredentialsDto, LoginResult } from "./dto/login.dto";
import { ActiveUser, UseAuth } from "@/framework/common/guards";
import { AcceptImageUpload, ImageService } from "@/image/image.service";
import { sendMessage } from "@/framework/common/response-creators";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly imageService: ImageService
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
  public async getMe(@ActiveUser() user: User): Promise<User> {
    return user;
  }

  @Post("me/upload-image")
  @UseAuth()
  @AcceptImageUpload()
  public async uploadImage(
    @ActiveUser() user: User,
    @UploadedFile() image: Express.Multer.File
  ) {
    await this.imageService.saveImage(image, { user });
    return sendMessage("Uploaded successfully");
  }
}
