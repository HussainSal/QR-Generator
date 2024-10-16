import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/registerUserDto';
import { LoginCredentialDto } from './dto/login-user-dto';
import * as bcrypt from 'bcrypt';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './dto/payload';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registerUser(userDto: RegisterUserDto) {
    const user = await this.userService.create(userDto);

    if (!user) {
      throw new Error('User not created');
    }

    return user;
  }

  async login(
    loginCredentialDto: LoginCredentialDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = loginCredentialDto;

    const user = await this.userService.getByEmail(email);
    try {
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload: Payload = { id: user.id, email: user.email };

      return { accessToken: this.jwtService.sign(payload) };
    } catch (err) {
      console.log(err, 'ERROR');
      throw new UnauthorizedException(err);
    }
  }
}
