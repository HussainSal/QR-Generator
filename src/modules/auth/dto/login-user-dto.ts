import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginCredentialDto {
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

}
