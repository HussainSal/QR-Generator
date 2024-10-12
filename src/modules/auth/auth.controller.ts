import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterCredentialDto } from './dto/register-user-dto';
import { LoginCredentialDto } from './dto/login-user-dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Post('register')
    async register(@Body() registerCredentialsDto:RegisterCredentialDto){
       return this.authService.registerUser(registerCredentialsDto)
    }

    @Post('login')
    async login(@Body() loginCredentialDto:LoginCredentialDto){
        return this.authService.loginUser(loginCredentialDto)
    }
}
