import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RazorPayEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  razor_order_id: string;

  @Column()
  razor_payment_id: string;

  @Column()
  razor_secret_id: string;
}
