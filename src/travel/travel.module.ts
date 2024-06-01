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
import { User } from "@/auth/entities/user.entity";
import { TravelController } from "./travel.controller";
import { CommentController } from "./comment.controller";
import { ReviewController } from "./review.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Stop,
      Travel,
      TravelStop,
      Order,
      Comment,
      Review
    ])
  ],
  controllers: [TravelController, CommentController, ReviewController]
})
export class TravelModule {}
