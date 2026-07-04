import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Product } from '../../products/entities/product.entity';

export enum PaymentMethod {
  CASH = 'Cash',
  VISA = 'Visa',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column('double precision')
  longitude: number;

  @Column('double precision')
  latitude: number;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.CASH,
  })
  paymentMethod: PaymentMethod;

  @ManyToOne(() => User, (user) => user.orders, { eager: false, onDelete: 'CASCADE' })
  client: User;

  @ManyToMany(() => Product, (product) => product.orders)
  @JoinTable({
    name: 'order_products',
    joinColumn: { name: 'order_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
  })
  products: Product[];
}
