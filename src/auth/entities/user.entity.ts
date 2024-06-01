import { Chat } from "@/chat/entities/chat.entity";
import { AppBaseEntity } from "@/framework/database/appbase.entity";
import { Image } from "@/images/entities/image.entity";
import { Comment, Order, Review, Travel } from "@/travel/entities/stop.entity";
import { Exclude } from "class-transformer";
import { Column, Entity, OneToMany, OneToOne } from "typeorm";

@Entity()
export class User extends AppBaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  cnic: string;

  @OneToOne(() => Image, image => image.user, { nullable: true, eager: true })
  profileImage?: Image;

  @OneToMany(() => Travel, travel => travel.user, { cascade: true })
  travels: Travel[];

  @OneToMany(() => Order, order => order.customer, { cascade: true })
  orders: Order[];

  @OneToMany(() => Comment, comment => comment.user, { cascade: true })
  comments: Comment[];

  @OneToMany(() => Review, review => review.user, { cascade: true })
  reviews: Review[];

  @OneToMany(() => Chat, chat => chat.sender, { cascade: true })
  outgoingChats: Chat[];

  @OneToMany(() => Chat, chat => chat.receiver, { cascade: true })
  incomingChats: Chat[];
}
