import { User } from "@/auth/entities/user.entity";
import { AppBaseEntity } from "@/framework/database/appbase.entity";
import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { Order } from "./order.entity";
import { Review } from "./review.entity";
import { TravelStop } from "./travel-stop.entity";
import { Comment } from "./comment.entity";

@Entity()
export class Travel extends AppBaseEntity {
  @Column({ default: true })
  active: boolean;

  @Column({ default: true })
  availableForOrder: boolean;

  @Column()
  startDate: Date;

  @Column({ nullable: true })
  endDate?: Date;

  @Column()
  totalCapacity: number;

  @Column()
  remainingCapacity: number;

  @ManyToOne(() => User, user => user.travels)
  user: User;

  @OneToMany(() => TravelStop, travelStop => travelStop.travel, { cascade: true })
  travelStops: TravelStop[];

  @OneToMany(() => Order, order => order.travel, { cascade: true })
  orders: Order[]

  @OneToMany(() => Comment, comment => comment.travel, { cascade: true })
  comments: Comment[]

  @OneToMany(() => Review, review => review.travel, { cascade: true })
  reviews: Review[]
}
