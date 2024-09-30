import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail(undefined, { message: 'Please enter a valid email.' })
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6)
  @ApiProperty()
  password: string;

  @IsString()
  @ApiProperty()
  avatar: string;
}

export class GetUserDetailDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail(undefined, { message: 'Please enter a valid email.' })
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  avatar: string;
}
