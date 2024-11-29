import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsDateString,
  IsUUID,
  IsNumber,
  IsObject,
} from 'class-validator';
import { Exclude, Type } from 'class-transformer';

export class UserDto {
  @ApiProperty({
    description: 'User ID',
    type: String,
  })
  @IsUUID()
  id: string;
}

export class PdfDto {
  @ApiProperty({
    description: 'Company name associated with the PDF',
    type: String,
  })
  @IsString()
  company: string;

  @ApiProperty({
    description: 'Title of the PDF',
    type: String,
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'User details associated with the PDF',
    type: UserDto,
  })
  @IsObject()
  @Type(() => UserDto)
  user: UserDto;

  @ApiProperty({
    description: 'Welcome screen content (optional)',
    nullable: true,
    type: String,
  })
  @IsOptional()
  WelcomeScreen: string | null;

  @ApiProperty({
    description: 'Color scheme (optional)',
    nullable: true,
    type: String,
  })
  @IsOptional()
  Color: string | null;

  @ApiProperty({
    description: 'Address (optional)',
    nullable: true,
    type: String,
  })
  @IsOptional()
  address: string | null;

  @ApiProperty({
    description: 'Website URL (optional)',
    nullable: true,
    type: String,
  })
  @IsOptional()
  website: string | null;

  @ApiProperty({
    description: 'Description of the PDF (optional)',
    nullable: true,
    type: String,
  })
  @IsOptional()
  description: string | null;

  @ApiProperty({
    description: 'Background image or color (optional)',
    nullable: true,
    type: String,
  })
  @IsOptional()
  background: string | null;

  @ApiProperty({
    description: 'Styling options (optional)',
    nullable: true,
    type: String,
  })
  @IsOptional()
  styling: string | null;

  @ApiProperty({
    description: 'Unique identifier for the PDF',
    type: String,
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Binary PDF file (excluded from response)',
    type: 'binary',
    writeOnly: true,
  })
  //   @Exclude()
  pdfFile: string; // Marked as optional since it won't be sent in responses
}

export class QrCodeDto {
  @ApiProperty({
    description: 'Timestamp of QR code creation',
    type: String,
  })
  @IsDateString()
  createdAt: string;

  @ApiProperty({
    description: 'Name of the QR code',
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Link associated with the QR code',
    type: String,
  })
  @IsString()
  link: string;

  @ApiProperty({
    description: 'Number of times the QR code has been scanned',
    type: Number,
  })
  @IsNumber()
  scans: number;

  @ApiProperty({
    description: 'Duration the QR code is active in seconds',
    type: Number,
  })
  @IsNumber()
  activeDuration: number;

  @ApiProperty({
    description: 'Encoded QR code image (optional)',
    nullable: true,
    type: String,
  })
  @IsOptional()
  qrCode: string;

  @ApiProperty({
    description: 'User details associated with the QR code',
    type: UserDto,
  })
  @IsObject()
  @Type(() => UserDto)
  user: UserDto;

  @ApiProperty({
    description: 'Frame details for the QR code (optional)',
    nullable: true,
    type: String,
  })
  @IsOptional()
  frame: string | null;

  @ApiProperty({
    description: 'Logo URL for the QR code (optional)',
    nullable: true,
    type: String,
  })
  @IsOptional()
  logo: string | null;

  @ApiProperty({
    description: 'Color scheme for the QR code (optional)',
    nullable: true,
    type: String,
  })
  @IsOptional()
  color: string | null;

  @ApiProperty({
    description: 'Unique identifier for the QR code',
    type: String,
  })
  @IsUUID()
  id: string;
}

export class PdfResponseDto {
  @ApiProperty({
    description: 'Details of the PDF',
    type: PdfDto,
  })
  @IsObject()
  @Type(() => PdfDto)
  pdf: PdfDto;

  @ApiProperty({
    description: 'Details of the associated QR code',
    type: QrCodeDto,
  })
  @IsObject()
  @Type(() => QrCodeDto)
  qrCode: QrCodeDto;
}
