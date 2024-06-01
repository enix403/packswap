import { User } from "@/auth/entities/user.entity";
import { AppBaseEntity } from "@/framework/database/appbase.entity";
import { Entity, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { TravelStop } from "./travel-stop.entity";
import { Travel } from "./travel.entity";

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

  @CreateDateColumn()
  createdAt: Date;
}
