import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ERROR_MESSAGES } from '../../common/constants/enums/error-massage.enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies['jwt'];
    if (!token) {
      throw new UnauthorizedException({
        message: ERROR_MESSAGES.AUTHENTICATION_EXIT_CODE[1001],
      });
    }
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException(ERROR_MESSAGES.AUTHENTICATION_EXIT_CODE[1002]);
    }
    return user;
  }
}