<<<<<<< HEAD
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterCredentialDto } from './dto/register-user-dto';
import { User } from '../users/entities/user.entity';
import { LoginCredentialDto } from './dto/login-user-dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService:JwtService

  ) {}

  async registerUser(
    registerCredentialsDto: RegisterCredentialDto,
  ): Promise<User> {
    return await this.userService.create(registerCredentialsDto);
  }

  async loginUser(LoginCredentialDto: LoginCredentialDto) {
    let dbUser: User | null = null;

    try {
      dbUser = await this.userService.getByEmail(LoginCredentialDto.email);

      const isPasswordMatching = bcrypt.compare(
        LoginCredentialDto.password,
        dbUser.password,
      );

      if (!isPasswordMatching) {
        throw new Error();
      }
    } catch (err) {
      throw new UnauthorizedException();
    }

    const payload = {
        name:dbUser.name,
        email:dbUser.email,
    }

    
    return {
        accessToken:this.jwtService.sign(payload)
    }
=======
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/registerUserDto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async registerUser(userDto: RegisterUserDto) {
    const user = await this.userService.create(userDto);

    if (!user) {
      throw new Error('User not created');
    }

    return user;
>>>>>>> e94e144c35a80167fbdbb1529ed89d0e8ef3c451
  }
}
