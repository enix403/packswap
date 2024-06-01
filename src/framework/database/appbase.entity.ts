import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class AppBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
