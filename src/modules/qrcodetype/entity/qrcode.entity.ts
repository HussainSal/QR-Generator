import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Website } from './website.entity';
import { Pdf } from './pdf.entity';
import { VCard } from 'src/modules/vcard/entity/vcard.entitiy';
import { IsOptional } from 'class-validator';


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

  @IsOptional()
  @OneToOne(() => Website, (website) => website.qrCode)
  websites: Website;

  @IsOptional()
  @OneToOne(() => Pdf, (pdf) => pdf.qrCode)
  pdfs: Pdf;
}
