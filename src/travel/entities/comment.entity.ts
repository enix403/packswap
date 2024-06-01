import { User } from "@/auth/entities/user.entity";
import { AppBaseEntity } from "@/framework/database/appbase.entity";
import { Entity, Column, ManyToOne } from "typeorm";
import { Travel } from "./travel.entity";

@Entity()
export class Comment extends AppBaseEntity {
  @Column({ type: 'text' })
  body: string;

  @ManyToOne(() => Travel, travel => travel.comments)
  travel: Travel;

  @ManyToOne(() => User, user => user.comments)
  user: User;
}
