import { User } from 'src/modules/users/entity/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QrCode } from './qrcode.entity';

@Entity()
export class Website extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (User) => User.Website)
  user: User;

  @OneToOne(() => QrCode, (qrCode) => qrCode.vCard)
  qrCode: QrCode;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column('int')
  contact: number;

  @Column()
  email: string;

  @Column({ nullable: true })
  directions: string;

  @Column({ nullable: true })
  background: string;

  @Column({ nullable: true })
  styling: string;
}
