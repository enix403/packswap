import { User } from "@/auth/entities/user.entity";
import { UUIDParam } from "@/framework/common/decorators";
import { UseAuth, ActiveUser } from "@/framework/common/guards";
import {
  ensureUpdate,
  entityCreated,
  entityUpdated
} from "@/framework/common/response-creators";
import {
  AddCommentDto,
  AddReviewDto,
  UpdateCommentDto
} from "./dto/commenting.dto";
// import { Comment, Travel } from "@/travel/entities/stop.entity";
import { Body, Controller, Delete, Patch, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "./entities/comment.entity";
import { Travel } from "./entities/travel.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Comment")
@Controller("comment")
export class CommentController {
  constructor(
    @InjectRepository(Travel)
    private readonly travelRepo: Repository<Travel>,
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>
  ) {}

  @Post()
  @UseAuth()
  public async addComment(
    @ActiveUser() user: User,
    @Body() dto: AddCommentDto
  ) {
    let travel = await this.travelRepo.findOneOrFail({
      where: { id: dto.travelId, user }
    });

    return entityCreated(
      await this.commentRepo.save({
        body: dto.body,
        travel,
        user
      })
    );
  }

  @Patch(":id")
  @UseAuth()
  public async updateComment(
    @ActiveUser() user: User,
    @UUIDParam("id") id: string,
    @Body() dto: UpdateCommentDto
  ) {
    await ensureUpdate(
      this.commentRepo.update({ id, user }, { body: dto.body })
    );
    return entityUpdated();
  }

  @Delete(":id")
  @UseAuth()
  public async deleteComment(
    @ActiveUser() user: User,
    @UUIDParam("id") id: string
  ) {
    await this.commentRepo.delete({ id, user });
    return entityUpdated();
  }
}
