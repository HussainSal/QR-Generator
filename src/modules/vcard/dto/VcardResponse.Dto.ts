import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsUUID,
  IsDateString,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';

class UserResponseDto {
  @ApiProperty({
    description: 'User ID',
    type: String,
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'User Name',
    type: String,
  })
  @IsString()
  name: string;
}

export class VcardResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the resource',
    type: String,
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Creation timestamp of the record',
    type: String,
  })
  @IsDateString()
  createAt: string;

  @ApiProperty({
    description: 'Image URL or null',
    nullable: true,
    type: String,
  })
  @IsOptional()
  image: string | null;

  @ApiProperty({
    description: 'First name of the person',
    type: String,
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Last name of the person',
    type: String,
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Contact number of the person',
    type: String,
  })
  @IsString()
  contact: string;

  @ApiProperty({
    description: 'Fax number (optional)',
    nullable: true,
    type: String,
  })
  @IsOptional()
  fax: string | null;

  @ApiProperty({
    description: 'Email address of the person',
    type: String,
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Company name',
    type: String,
  })
  @IsString()
  company: string;

  @ApiProperty({
    description: 'Job title or position',
    type: String,
  })
  @IsString()
  yourJob: string;

  @ApiProperty({
    description: 'Address of the person',
    type: String,
  })
  @IsString()
  address: string;

  @ApiProperty({
    description: 'Title (e.g., project or position)',
    type: String,
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Website URL',
    type: String,
  })
  @IsString()
  website: string;

  @ApiProperty({
    description: 'Summary or description',
    type: String,
  })
  @IsString()
  summary: string;

  @ApiProperty({
    description: 'Instagram URL (optional)',
    nullable: true,
    type: String,
  })
  @IsOptional()
  instaUrl: string | null;

  @ApiProperty({
    description: 'Facebook URL (optional)',
    nullable: true,
    type: String,
  })
  @IsOptional()
  facebookUrl: string | null;

  @ApiProperty({
    description: 'GitHub URL (optional)',
    nullable: true,
    type: String,
  })
  @IsOptional()
  githubUrl: string | null;

  @ApiProperty({
    description: 'Telegram URL (optional)',
    nullable: true,
    type: String,
  })
  @IsOptional()
  telegramUrl: string | null;

  @ApiProperty({
    description: 'Twitter handle or URL (optional)',
    nullable: true,
    type: String,
  })
  @IsOptional()
  twitter: string | null;

  @ApiProperty({
    description: 'Welcome screen content (optional)',
    nullable: true,
    type: String,
  })
  @IsOptional()
  welcomeScreen: string | null;

  @ApiProperty({
    description: 'Directions (optional)',
    nullable: true,
    type: String,
  })
  @IsOptional()
  directions: string | null;

  @ApiProperty({
    description: 'Background (optional)',
    nullable: true,
    type: String,
  })
  @IsOptional()
  background: string | null;

  @ApiProperty({
    description: 'Styling options in JSON format',
    type: String,
  })
  @IsString()
  styling: string;

  @ApiProperty({
    description: 'User object with limited fields',
    type: UserResponseDto,
  })
  @IsObject()
  @Type(() => UserResponseDto)
  user: UserResponseDto;
}
