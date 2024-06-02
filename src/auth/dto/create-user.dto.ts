import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  Min,
  MinLength
} from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: "Password must have at-least 6 characters" })
  @Matches(/[A-Z]/, {
    message: "Password must contain at-least one uppercase character",
  })
  @Matches(/[a-z]/, {
    message: "Password must contain at-least one lowercase character"
  })
  @Matches(/\d/, { message: "Password must contain at-least one digit" })
  @Matches(/_|[^\w]/, {
    message: "Password must contain at-least one special character"
  })
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  readonly cnic: string;
}
