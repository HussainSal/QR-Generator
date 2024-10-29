import { User } from 'src/modules/users/entity/user.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { QrCode } from './qrcode.entity';

@Entity()
export class Pdf extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.pdf)
  user: User;

  @OneToOne(() => QrCode, (qrCode) => qrCode.vCards)
  qrCode: QrCode;

  @Column()
  name: string;

  @Column()
  file: string;

  @Column({ nullable: true })
  welcomeScreen: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  website: string;

  @Column('int')
  contact: number;

  @Column()
  email: string;

  @Column({ nullable: true })
  company: string;

  @Column({ nullable: true })
  directions: string;

  @Column({ nullable: true })
  background: string;

  @Column({ nullable: true })
  styling: string;
}
