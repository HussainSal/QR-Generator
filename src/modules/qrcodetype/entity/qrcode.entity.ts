import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { Website } from './website.entity';
import { VCard } from 'src/modules/vcard/entity/vcard.entitiy';
import { IsOptional } from 'class-validator';
import { User } from 'src/modules/users/entity/user.entity';
import { PdfEntity } from 'src/modules/pdf/entity/Pdf.entity';


export enum QrType {
  VCARD = "VCARD",
  WEBSITE = "WEBSITE",
  PDF = "PDF",
}


@Entity()
export class QrCode extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  createdAt: string;

  @Column()
  name: string;

  @Column()
  link: string;

  // @OneToMany(() => User, (User)=> User.id)
  // user: User

  @Column('int',{default:0})
  scans: number;

  @Column('int',{default:0})
  @IsOptional()
  activeDuration: number;

  @Column({ nullable: true })
  frame: string;

  @Column()
  qrCode: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ nullable: true })
  color: string;

  @IsOptional()
  @OneToOne(() => VCard, (vCard) => vCard.qrCode)
  vCards: VCard;

  @OneToOne(() => User, (User) => User.id)
  user: User;

  @IsOptional()
  @OneToOne(() => Website, (website) => website.qrCode)
  websites: Website;

  @IsOptional()
  @OneToOne(() => PdfEntity, (pdf) => pdf.qrCode)
  pdf: PdfEntity;
}
