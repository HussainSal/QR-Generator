import { QrCode } from 'src/modules/qrcodetype/entity/qrcode.entity';
import { User } from 'src/modules/users/entity/user.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm';

@Entity()
export class VCard extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.vcard)
  user: User;

  @OneToOne(() => QrCode, (qrCode) => qrCode.vCards)
  qrCode: QrCode;

  @Column({ nullable: true })
  image: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  contact: string;

  @Column('int', { nullable: true })
  fax: number;

  @Column()
  email: string;

  @Column()
  company: string;

  @Column({ nullable: true })
  yourJob: string;

  @Column({ nullable: true })
  address: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  summary: string;

  @Column({ nullable: true })
  instaUrl: string;

  @Column({ nullable: true })
  facebookUrl: string;

  @Column({ nullable: true })
  githubUrl: string;

  @Column({ nullable: true })
  telegramUrl: string;

  @Column({ nullable: true })
  twitter: string;

  @Column({ nullable: true })
  welcomeScreen: string;

  @Column({ nullable: true })
  directions: string;

  @Column({ nullable: true })
  background: string;

  @Column({ nullable: true })
  styling: string;
}
