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
import { VCard } from './vcard.entitiy';

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

  @Column('int')
  scans: number;

  @Column('int')
  activeDuration: number;

  @Column({ nullable: true })
  frame: string;

  @Column({ nullable: true })
  qrCode: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ nullable: true })
  color: string;

  @OneToOne(() => VCard, (vCard) => vCard.qrCode)
  vCards: VCard[];

  @OneToOne(() => Website, (website) => website.qrCode)
  websites: Website[];

  @OneToOne(() => Pdf, (pdf) => pdf.qrCode)
  pdfs: Pdf[];
}
