import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, GetUserDetailDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt'; // Correct import
import { Plan, Subscription } from './entity/subscription.entity';

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
      throw new BadRequestException('User already exist');
    }

    const hashedPassword = await bcrypt.hash(password, 9);
    console.log(hashedPassword, 'HASHED');

    const activationDate = new Date().toISOString();

    // Set expiresOn 15 days after the current date
    const expiresOn = new Date();
    expiresOn.setDate(expiresOn.getDate() + 15); // Adds 15 days to the current date
    const expiresOnISOString = expiresOn.toISOString(); // Converts to ISO string format

    const plan = Plan.FREE;
    // // Create the subscription entity
    // const subscription = await this.subscriptionRepository.create({
    //   plan,
    //   activationDate,
    //   expiresOn: expiresOnISOString,
    // });

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
