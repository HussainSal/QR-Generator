import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/get-user-decoratore';
import { User } from './entities/user.entity';

<<<<<<< HEAD
@Controller('auth')
// @ApiTags('Auth')
=======
// @ApiTags('Auth')
@Controller('users')
>>>>>>> e94e144c35a80167fbdbb1529ed89d0e8ef3c451
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

<<<<<<< HEAD
    @Get('/')
    async find(@GetUser() user:User){
      return this.userService.getByEmail(user.email)
    }


    @Get('/all')
    async findAll(){
      return this.userService.getAll()
    }

        
=======
  // @Get('/:id')
  // async getById (@Param('id')id:string){
  //     return this.userService.getById(id);
  // }

  // @Delete()
  // async remove(@Param('id')id:string){
  //     return this.userService.delete(id);
  // }
>>>>>>> e94e144c35a80167fbdbb1529ed89d0e8ef3c451
}
