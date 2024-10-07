import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../../constants/enums/roles.enum';
import { ERROR_MESSAGES } from '../../constants/enums/error-massage.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Roles[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!roles.includes(user.role)) {
      throw new UnauthorizedException({
        message: ERROR_MESSAGES.AUTHORIZATION_EXIT_CODE[2001],
      });
    }
    return true;
  }
}
