import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, isEmail, IsOptional, IsString } from 'class-validator';

export class CreatePdfDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @IsOptional()
  @ApiProperty()
  contact: string;

  @IsOptional()
  @ApiProperty({ required: false })
  title?: string;

  @ApiProperty({ required: false })
  company?: string;

  @ApiProperty({ required: true })
  pdfFile: Express.Multer.File; // Change Buffer to Express.Multer.File

  @IsOptional()
  @ApiProperty({ required: false })
  yourJob?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  address?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  website?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  summary?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  welcomeScreen?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  background?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  styling?: string;
}
