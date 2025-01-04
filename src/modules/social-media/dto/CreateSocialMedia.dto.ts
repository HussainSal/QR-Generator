import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsEmail,
  IsBoolean,
  isString,
} from 'class-validator';
// import { } from "class-transformer"

export class CreateSocialMediaDTO {
  @IsOptional()
  @ApiProperty({ required: false })
  image?: Express.Multer.File; // Change Buffer to Express.Multer.File

  @IsString()
  @IsNotEmpty()
  headLine: string;

  @IsString()
  @IsOptional()
  aboutUs: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  sharing: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  company: string;

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

  @IsOptional()
  @ApiProperty({ required: false })
  welcomeScreen: Express.Multer.File;

  @IsString()
  @IsOptional()
  background: string;

  @IsString()
  @IsOptional()
  styling: string;
}
