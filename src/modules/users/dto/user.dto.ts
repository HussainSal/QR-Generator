import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail(undefined, { message: 'Please enter a valid email.' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6)
  password: string;

  @IsString()
  avatar:string
}
