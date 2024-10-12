import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
<<<<<<< HEAD
import { ApiTags } from '@nestjs/swagger';
import { RegisterCredentialDto } from './dto/register-user-dto';
import { LoginCredentialDto } from './dto/login-user-dto';
=======
import { RegisterUserDto } from './dto/registerUserDto';
import { ApiTags } from '@nestjs/swagger';
>>>>>>> e94e144c35a80167fbdbb1529ed89d0e8ef3c451

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
<<<<<<< HEAD
    constructor(private readonly authService:AuthService){}

    @Post('register')
    async register(@Body() registerCredentialsDto:RegisterCredentialDto){
       return this.authService.registerUser(registerCredentialsDto)
    }

    @Post('login')
    async login(@Body() loginCredentialDto:LoginCredentialDto){
        return this.authService.loginUser(loginCredentialDto)
    }
=======
  constructor(private authService: AuthService) {}

  @Post('/')
  async create(@Body() userDto: RegisterUserDto) {
    const user = await this.authService.registerUser(userDto);
    return user;
  }
>>>>>>> e94e144c35a80167fbdbb1529ed89d0e8ef3c451
}
