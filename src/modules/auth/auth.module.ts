import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
<<<<<<< HEAD
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
=======
import { UsersService } from '../users/users.service';
>>>>>>> e94e144c35a80167fbdbb1529ed89d0e8ef3c451

@Module({
  imports:[
    UsersModule,
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret:'secret',
      signOptions:{expiresIn:'10h'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersService],
})
export class AuthModule {}
