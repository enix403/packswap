import { AppBaseEntity } from "@/framework/database/appbase.entity";
import { TravelStop } from "./travel-stop.entity";
import { Column, Entity, OneToMany } from "typeorm";

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
