import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class CreateVcardDto {
  @IsOptional()
  @ApiProperty({ required: false })
  image?: Express.Multer.File; // Change Buffer to Express.Multer.File

  @IsOptional()
  @ApiProperty({ required: false })
  imageId?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  welcomeScreen?: Express.Multer.File; // Change Buffer to Express.Multer.File

  @IsOptional()
  @ApiProperty({ required: false })
  welcomeScreenId?: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  contact: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  company: string;

  @IsString()
  @IsOptional()
  yourJob: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  website: string;

  @IsString()
  @IsOptional()
  summary: string;

  @IsString()
  @IsOptional()
  instaUrl: string;

  @IsString()
  @IsOptional()
  facebookUrl: string;

  @IsString()
  @IsOptional()
  githubUrl: string;

  @IsString()
  @IsOptional()
  telegramUrl: string;

  @IsString()
  @IsOptional()
  twitter: string;

  @IsString()
  @IsOptional()
  directions: string;

  @IsString()
  @IsOptional()
  background: string;

  @IsString()
  @IsOptional()
  styling: string;
}

export class UpdateVcardDto extends CreateVcardDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
