import { User } from "@/auth/entities/user.entity";
import { AppBaseEntity } from "database/appbase.entity";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from "typeorm";

@Entity()
export class Stop extends AppBaseEntity {
  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @OneToMany(() => TravelStop, travelStop => travelStop.stop)
  travelStops: TravelStop[];
}

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

@Entity()
export class TravelStop extends AppBaseEntity {
  @ManyToOne(() => Travel, travel => travel.travelStops, { onDelete: 'CASCADE' })
  travel: Travel;

  @ManyToOne(() => Stop, stop => stop.travelStops, { cascade: true, onDelete: 'CASCADE' })
  stop: Stop;

  @Column()
  index: number;

  @OneToMany(() => Order, order => order.pickupStop)
  ordersForPickup: Order[];

  @OneToMany(() => Order, order => order.destinationStop)
  ordersForDestination: Order[];
}

@Entity()
export class Order extends AppBaseEntity {
  @Column()
  luggageCapacity: number;

  @ManyToOne(() => Travel, travel => travel.orders)
  travel: Travel;

  @ManyToOne(() => TravelStop, travelStop => travelStop.ordersForPickup)
  pickupStop: TravelStop;

  @ManyToOne(() => TravelStop, travelStop => travelStop.ordersForDestination)
  destinationStop: TravelStop;

  @ManyToOne(() => User, user => user.orders)
  customer: User;
}

@Entity()
export class Comment extends AppBaseEntity {
  @Column({ type: 'text' })
  body: string;

  @ManyToOne(() => Travel, travel => travel.comments)
  travel: Travel;

  @ManyToOne(() => User, user => user.comments)
  user: User;
}

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
