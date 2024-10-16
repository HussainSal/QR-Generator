import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUserDto';
import { ApiTags } from '@nestjs/swagger';
import { LoginCredentialDto } from './dto/login-user-dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async create(@Body() userDto: RegisterUserDto) {
    const user = await this.authService.registerUser(userDto);
    return user;
  }

  @Post('login')
  async signIn(@Body() loginCredentialDto: LoginCredentialDto) {
    const token = await this.authService.login(loginCredentialDto);
    console.log(token, 'TOKEN');
    return token;
  }
}
