// import { User } from '@/auth/entities/user.entity';
import { User } from '@/auth/entities/user.entity';
import { AppBaseEntity } from '@/database/appbase.entity';
import { Column, Entity, JoinColumn, OneToOne, Relation } from 'typeorm';

@Entity()
export class Image extends AppBaseEntity {
  @Column()
  url: string;

  @OneToOne(() => User, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn()
  user?: User;
}
