import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateQrDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  link: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  serviceId: string;

  // @IsNumber()
  // @ApiProperty()
  // scans: number ;

  // @IsNumber()
  // @ApiProperty()
  // activeDuration: number ;

  // @IsNotEmpty()
  // @IsString()
  // createdAt: string;

  // @IsNotEmpty()
  // @IsString()
  // @ApiProperty()
  // qrcode: string;
}
