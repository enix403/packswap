import { NestFactory } from "@nestjs/core";

import { AppModule } from "../src/app.module";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Injectable, Module } from "@nestjs/common";

import * as R from "remeda";
import { User } from "@/auth/entities/user.entity";
import { AuthService } from "@/auth/auth.service";
import { AuthModule } from "@/auth/auth.module";

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 */
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

@Injectable()
class SeederService {
  constructor(
    private readonly connection: DataSource,
    private readonly authService: AuthService
  ) {}

  private async clearDatabase() {
    await this.connection.dropDatabase();
    await this.connection.synchronize();
  }

  public async seed() {
    await this.clearDatabase();
    await this.addUsers();
  }

  private async addUsers() {
    for (let i = 1; i <= 12; ++i) {
      await this.authService.createUser(
        {
          email: `user${i}@gmail.com`,
          password: "pass",
          firstName: "User",
          lastName: `${i}`,
          cnic: getRandomInt(111111111111, 999999999999).toString()
        },
        i == 1 ? "7ed64991-f562-4e11-916a-18935d4840f1" : undefined
      );
    }
  }
}

@Module({
  imports: [AppModule, AuthModule, TypeOrmModule.forFeature([User])],
  providers: [SeederService]
})
class SeederModule {}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule, {
    logger: ["error", "warn", "fatal"]
  });

  await app.get(SeederService).seed();
  await app.close();
}

bootstrap();
