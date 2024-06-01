import { User } from "@/auth/entities/user.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Chat } from "./entities/chat.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Chat])]
})
export class ChatModule {}
