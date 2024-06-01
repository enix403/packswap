import { AppBaseEntity } from "@/framework/database/appbase.entity";
import { Entity, ManyToOne, Column, OneToMany } from "typeorm";
import { Order } from "./order.entity";
import { Stop } from "./stop.entity";
import { Travel } from "./travel.entity";

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
