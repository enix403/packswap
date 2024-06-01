// import { User } from '@/auth/entities/user.entity';
import { User } from '@/auth/entities/user.entity';
import { AppBaseEntity } from '@/framework/database/appbase.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, Relation } from 'typeorm';

@Entity()
export class Image extends AppBaseEntity {
  @Column()
  url: string;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  user?: User;

  @Column()
  kind: string;
}
