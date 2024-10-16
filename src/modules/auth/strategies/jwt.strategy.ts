import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from 'src/modules/users/users.service';

interface JWTPayload {
  name: string;
  email: string;
}

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
    });
  }

  async validate(payload: JWTPayload) {
    const { email } = payload;
    const user = await this.userService.getByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Unauthorized User');
    }
    return user;
  }
}
