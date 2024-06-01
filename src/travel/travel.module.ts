import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  Stop,
  Travel,
  TravelStop,
  Order,
  Review,
  Comment
} from "./entities/stop.entity";
import { TravelController } from './travel.controller';
import { User } from "@/auth/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Stop, Travel, TravelStop, Order, Comment, Review])
  ],
  controllers: [TravelController]
})
export class TravelModule {}
