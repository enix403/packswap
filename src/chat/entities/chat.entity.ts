import { User } from "@/auth/entities/user.entity";
import { AppBaseEntity } from "@/framework/database/appbase.entity";
import { Entity, Column, ManyToOne } from "typeorm";

@Entity()
export class Chat extends AppBaseEntity {
  @Column({ type: "text" })
  message: string;

  @ManyToOne(() => User, user => user.outgoingChats)
  sender: string;

  @ManyToOne(() => User, user => user.incomingChats)
  receiver: User;

  @Column({ default: false })
  seen: boolean;
}
