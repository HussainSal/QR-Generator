import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants, Payload } from '../dto/payload';
// import { AuthService } from '../auth.service';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private userService:UsersService) { // Inject UsersService correctly here
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
    console.log('JWT Initialized'); // This should log
  }

  async validate(payload: Payload) {
    console.log("Validate Method Triggered:", payload); // Check if this logs
    const { email } = payload;
    const user = await this.userService.getByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Unauthorized User!');
    }
    console.log('AUTH_CHECK', user)
    return user;
  }
}
