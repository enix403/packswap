// import { User } from '@/auth/entities/user.entity';
import { User } from '@/auth/entities/user.entity';
import { AppBaseEntity } from '@/framework/database/appbase.entity';
import { Column, Entity, JoinColumn, OneToOne, Relation } from 'typeorm';

@Entity()
export class Image extends AppBaseEntity {
  @Column()
  url: string;

  @OneToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn()
  user?: User;

  @Column()
  kind: string;
}
