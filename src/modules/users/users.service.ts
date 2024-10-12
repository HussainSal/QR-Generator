import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, GetUserDetailDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt'; // Correct import

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(payload: CreateUserDto): Promise<User> {
    const { password } = payload;
    console.log(password, 'PASSWORD');

    const userExist = await this.usersRepository.find({
      where: { email: payload.email },
    });

    console.log(userExist, 'userExist');
    if (userExist?.length) {
      throw new BadRequestException();
    }

    const hashedPassword = await bcrypt.hash(password, 9);
    console.log(hashedPassword, 'HASHED');
    const user = this.usersRepository.create({
      ...payload,
      password: hashedPassword,
    });
    await user.save();
    return user;
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });
    return user;
  }

  async getAll(): Promise<GetUserDetailDto[]> {
    const users = await this.usersRepository.find();

    return users;
  }

  async delete(id: string) {
    const user = await this.usersRepository.delete(id);
  }
}
