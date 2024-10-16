import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/get-user-decoratore';
import { User } from './entity/user.entity';

// @ApiTags('Auth')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/')
  async create(@Body() userDto: CreateUserDto) {
    const user = await this.userService.create(userDto);
    return user;
  }

  @Get('/')
  async getAll() {
    return this.userService.getAll();
  }

  // @Get('/:id')
  // async getById (@Param('id')id:string){
  //     return this.userService.getById(id);
  // }

  // @Delete()
  // async remove(@Param('id')id:string){
  //     return this.userService.delete(id);
  // }
}
