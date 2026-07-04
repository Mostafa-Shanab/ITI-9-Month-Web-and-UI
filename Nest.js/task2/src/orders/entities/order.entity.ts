import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum PaymentMethod {
  CASH = "Cash",
  VISA = "Visa",
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("float")
  amount: number;

  @Column("float")
  longitude: number;

  @Column("float")
  latitude: number;

  @Column("int")
  clientId: number;

  @Column({
    type: "enum",
    enum: PaymentMethod,
  })
  paymentMethod: PaymentMethod;
}
