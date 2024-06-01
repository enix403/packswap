import { AppBaseEntity } from "@/framework/database/appbase.entity";
import { Entity, JoinColumn, OneToOne } from "typeorm";
import { Image } from "@/image/entities/image.entity";
import { User } from "./user.entity";

@Entity()
export class UserProfileImage extends AppBaseEntity {
  @OneToOne(() => User, { onDelete: 'CASCADE', orphanedRowAction: 'delete' })
  user: User;

  @OneToOne(() => Image, { eager: true })
  @JoinColumn()
  image: Image;
}
