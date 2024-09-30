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
  }
}
