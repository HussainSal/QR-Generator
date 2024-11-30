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
  }

  async validate(payload: Payload) {
    const { email } = payload;
    const user = await this.userService.getByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Unauthorized User!');
    }
    return user;
  }
}
