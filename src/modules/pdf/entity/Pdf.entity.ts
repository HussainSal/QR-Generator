import { UploadedFile } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { QrCode } from 'src/modules/qrcodetype/entity/qrcode.entity';
import { User } from 'src/modules/users/entity/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PdfEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true }) // Use 'bytea' to store binary data
  pdfFile: string; // Store the PDF file as a Buffer

  @Column({ nullable: true })
  assetId: string;

  @ManyToOne(() => User, (user) => user.vcard)
  user: User;

  @OneToOne(() => QrCode, (qrCode) => qrCode.pdf)
  qrCode: QrCode;

  // logo while page is loading...
  @Column({ nullable: true })
  welcomeScreen: string;

  @Column()
  company: string;

  @Column({ nullable: true })
  Color: string;

  @Column({ nullable: true })
  address: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  background: string;

  @Column({ nullable: true })
  styling: string;
}
