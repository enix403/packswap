import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import type { User } from "../entities/user.entity";

export class LoginCredentialsDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export interface LoginResult {
  accessToken: string;
  user: User;
}
