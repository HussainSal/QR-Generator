import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    console.log('AuthGuard activated'); // Log to ensure this guard is hit
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      console.log('Unauthorized access:', err, user, info); // Log unauthorized access details
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
