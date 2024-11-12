import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Website } from './website.entity';
import { VCard } from 'src/modules/vcard/entity/vcard.entitiy';
import { IsOptional } from 'class-validator';
import { User } from 'src/modules/users/entity/user.entity';
import { PdfEntity } from 'src/modules/pdf/entity/Pdf.entity';

export enum QrType {
  VCARD = 'VCARD',
  WEBSITE = 'WEBSITE',
  PDF = 'PDF',
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

  @Column('int', { default: 0 })
  scans: number;

  @Column('int', { default: 0 })
  @IsOptional()
  activeDuration: number;

  @IsOptional()
  @Column({ nullable: true })
  frame: string;

  @IsOptional()
  @Column()
  qrCode: string;

  @IsOptional()
  @Column({ nullable: true })
  logo: string;

  @IsOptional()
  @Column({ nullable: true })
  color: string;

  @IsOptional()
  @OneToOne(() => VCard, (vCard) => vCard.qrCode)
  @JoinColumn() // Specify the join column
  vCard: VCard;

  @ManyToOne(() => User, (User) => User.qrCode)
  @JoinColumn()
  user: User;

  @IsOptional()
  @OneToOne(() => Website, (website) => website.qrCode)
  // @JoinColumn() // Specify the join column
  website: Website;

  @IsOptional()
  @OneToOne(() => PdfEntity, (pdf) => pdf.qrCode)
  // @JoinColumn() // Specify the join column
  pdf: PdfEntity;
}
