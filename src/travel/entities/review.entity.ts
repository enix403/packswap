import { User } from "@/auth/entities/user.entity";
import { AppBaseEntity } from "@/framework/database/appbase.entity";
import { Entity, Column, ManyToOne } from "typeorm";
import { Travel } from "./travel.entity";

@Entity()
export class Review extends AppBaseEntity {
  @Column({ type: 'text' })
  body: string;

  @Column()
  rating: number;

  @ManyToOne(() => Travel, travel => travel.reviews)
  travel: Travel;

  @ManyToOne(() => User, user => user.reviews)
  user: User;
}
