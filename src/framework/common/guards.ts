import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UseGuards,
  applyDecorators,
  createParamDecorator
} from "@nestjs/common";

import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

import { SetMetadata } from "@nestjs/common";
import { AccessTokenPayload } from "@/auth/auth.service";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@/auth/entities/user.entity";
import { Repository } from "typeorm";
import { ApiBearerAuth } from "@nestjs/swagger";

export const REQUEST_USER_KEY = "user";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.getToken(request) || "";

    let user: User | null = null;

    let isPublic =
      this.reflector.getAllAndOverride<boolean>("isPublic", [
        context.getHandler(),
        context.getClass()
      ]) || false;

    try {
      const payload = (await this.jwtService.verifyAsync(
        token
      )) as AccessTokenPayload;

      user = await this.userRepo.findOne({
        where: { id: payload.userId },
        loadEagerRelations: false
      });

      request[REQUEST_USER_KEY] = user;

      if (isPublic) return true;

      if (user)
        return true;

      throw new ForbiddenException();
    } catch {
      if (!isPublic) throw new ForbiddenException();

      return true;
    }
  }

  private getToken(request: Request) {
    let header = request.headers.authorization?.split(" ") ?? [];
    header.shift();

    return header.length > 0 ? header[0] : null;
  }
}

export function UseAuth(opts?: { allowPublic?: boolean }) {
  return applyDecorators(
    UseGuards(AuthGuard),
    ...(opts?.allowPublic ? [SetMetadata("isPublic", true)] : []),
    ApiBearerAuth(),
  );
}

export const ActiveUser = createParamDecorator(
  (field: keyof User | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: User | null = request[REQUEST_USER_KEY];
    return (field ? user?.[field] : user) ?? null;
  }
);
