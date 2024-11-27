import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUserDto';
import { ApiTags } from '@nestjs/swagger';
import { LoginCredentialDto } from './dto/login-user-dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user-decoratore';
import { User } from '../users/entity/user.entity';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async create(@Body() userDto: RegisterUserDto) {
    const user = await this.authService.registerUser(userDto);
    return user;
  }

  @Post('/login')
  async signIn(@Body() loginCredentialDto: LoginCredentialDto) {
    const token = await this.authService.login(loginCredentialDto);
    return token;
  }

  // @Post('/test')
  // @UseGuards(AuthGuard())
  // async test(@Req() req, @GetUser() user: User) {
  //   console.log(req.headers, 'REQUEST',user);
  //   return user;
  // }
}
