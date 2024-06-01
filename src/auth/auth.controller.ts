import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { AuthService } from "./auth.service";
import { LoginCredentialsDto, LoginResult } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  public async signUp(@Body() userDto: CreateUserDto): Promise<User> {
    let user = await this.authService.createUser(userDto);
    return user;
  }

  @Post("login")
  public async login(@Body() dto: LoginCredentialsDto): Promise<LoginResult> {
    return await this.authService.login(dto);
  }
}
