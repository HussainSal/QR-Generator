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
import { VCard } from 'src/modules/vcard/entity/vcard.entitiy';
import { QrCode } from 'src/modules/qrcodetype/entity/qrcode.entity';
import { PdfEntity } from 'src/modules/pdf/entity/Pdf.entity';
import { Exclude } from 'class-transformer';
import { WebsiteEntity } from 'src/modules/website/entitiy/Website.entity';
import SocialMediaEntity from 'src/modules/social-media/entity/socialMedia.entity';

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
  @Exclude()
  password: string;

  @Column({ default: null })
  avatar: string;

  @Column({ default: null })
  @IsOptional()
  about: string;

  @OneToOne(() => Subscription, (Subscription) => Subscription.user)
  subscription: Subscription;

  @OneToMany(() => VCard, (VCard) => VCard.user)
  vcard: VCard;

  @OneToMany(() => WebsiteEntity, (Website) => Website.user)
  website: WebsiteEntity;

  @OneToMany(() => PdfEntity, (Pdf) => Pdf.user)
  pdf: PdfEntity;

  @OneToMany(() => PdfEntity, (Pdf) => Pdf.user)
  socialMedia: SocialMediaEntity;

  @OneToMany(() => QrCode, (QrCode) => QrCode.user)
  qrCode: QrCode;
}
