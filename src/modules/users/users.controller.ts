import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/get-user-decoratore';
import { User } from './entities/user.entity';

@Controller('auth')
// @ApiTags('Auth')
export class UsersController {

    constructor(private userService: UsersService){}

    @Post('/')
    async create (@Body()userDto:CreateUserDto){
            this.userService.create(userDto)
    }

    @Get('/')
    async find(@GetUser() user:User){
      return this.userService.getByEmail(user.email)
    }


    @Get('/all')
    async findAll(){
      return this.userService.getAll()
    }

        
}
