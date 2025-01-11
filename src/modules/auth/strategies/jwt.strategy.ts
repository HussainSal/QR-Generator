import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants, Payload } from '../dto/payload';
// import { AuthService } from '../auth.service';
import { UsersService } from 'src/modules/users/users.service';
import { Request } from 'express';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    // Inject UsersService correctly here
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.token;
        },
      ]),
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
