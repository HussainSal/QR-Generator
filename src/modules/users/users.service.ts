import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/user.dto';
import bcrypt from "bcrypt"
import { hash } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(payload: CreateUserDto) :Promise<User> {
    const {password} = payload;
    const hashedPassword = await bcrypt.hash(password,9);
    const user = this.usersRepository.create({...payload, password:hashedPassword})
    await user.save()
    return user
  }


  async getByEmail(email:string):Promise<User>{
    const user = await this.usersRepository.findOne({where:{email:email}});
    return user
  }

  async getAll ():Promise<User[]> {
    const users = await this.usersRepository.find();
    return users
  }

  async delete (id:string) {
    const user = await this.usersRepository.delete(id);
  }
}
