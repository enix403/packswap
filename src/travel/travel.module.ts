import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { User } from "@/auth/entities/user.entity";
import { TravelController } from "./travel.controller";
import { CommentController } from "./comment.controller";
import { ReviewController } from "./review.controller";
import { Order } from "./entities/order.entity";
import { Review } from "./entities/review.entity";
import { Stop } from "./entities/stop.entity";
import { TravelStop } from "./entities/travel-stop.entity";
import { Travel } from "./entities/travel.entity";
import { Comment } from "./entities/comment.entity";

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
