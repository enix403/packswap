import {
  ConflictException,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { compare, genSalt, hash } from "bcrypt";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { LoginCredentialsDto } from "./dto/login.dto";
import { LoginResult } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  public getUserRepo() {
    return this.usersRepo;
  }

  public async hashPassword(password: string): Promise<string> {
    const salt = await genSalt();
    return hash(password, salt);
  }

  public async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return compare(password, hash);
  }

  public async createUser(userDto: CreateUserDto, setId?: string | undefined): Promise<User> {
    let user = new User();

    if (setId)
      user.id = setId;
    user.email = userDto.email;
    user.password = await this.hashPassword(userDto.password);
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.cnic = userDto.cnic;

    try {
      await this.usersRepo.save(user);
    } catch (error) {
      // TODO: No magic constants
      if (error.code === "23505") {
        throw new ConflictException(`User already exists`);
      }

      throw error;
    }

    return user;
  }

  private async generateAccessToken(user: User): Promise<string> {
    return this.jwtService.signAsync({
      userId: user.id
    } as AccessTokenPayload);
  }

  public async login({
    email,
    password
  }: LoginCredentialsDto): Promise<LoginResult> {
    let user = await this.usersRepo.findOneBy({ email });

    if (user === null) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const isPasswordMatch = await this.comparePassword(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException("Invalid email or password");
    }

    let accessToken = await this.generateAccessToken(user);

    return { accessToken, user };
  }
}

export interface AccessTokenPayload {
  userId: string;
}
