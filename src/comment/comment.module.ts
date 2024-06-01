import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/auth/entities/user.entity';
import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { Comment, Review, Travel } from '@/travel/entities/stop.entity';
import { ReviewController } from './review.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Travel, Comment, Review])],
  controllers: [CommentController, ReviewController]
})
export class CommentModule {}
