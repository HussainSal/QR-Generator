import {
  BaseEntity,
  Column,
  Entity,
  IsNull,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail, IsOptional } from 'class-validator';
import { Subscription } from './subscription.entity';
import { VCard } from 'src/modules/qrcodetype/entity/vcard.entitiy';
import { Website } from 'src/modules/qrcodetype/entity/website.entity';
import { Pdf } from 'src/modules/qrcodetype/entity/pdf.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column({ default: null })
  @IsOptional()
  about: string;

  @OneToOne(() => Subscription, (Subscription) => Subscription.user)
  subscription: Subscription;

  @ManyToOne(() => VCard, (VCard) => VCard.user)
  vcard: VCard;

  @ManyToOne(() => Website, (Website) => Website.user)
  Website: Website;

  @ManyToOne(() => Pdf, (Pdf) => Pdf.user)
  pdf: Pdf;
}
