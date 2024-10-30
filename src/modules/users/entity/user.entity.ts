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
import { Website } from 'src/modules/qrcodetype/entity/website.entity';
import { VCard } from 'src/modules/vcard/entity/vcard.entitiy';
import { QrCode } from 'src/modules/qrcodetype/entity/qrcode.entity';
import { PdfEntity } from 'src/modules/pdf/entity/Pdf.entity';

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

  @Column({default:null})
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

  @ManyToOne(() => PdfEntity, (Pdf) => Pdf.user)
  pdf: PdfEntity;

  @ManyToOne(() => QrCode, (QrCode)=> QrCode.user)
  qrCode: QrCode

}
