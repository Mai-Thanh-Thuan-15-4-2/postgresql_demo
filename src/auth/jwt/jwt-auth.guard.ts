import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies['jwt'];
    if (!token) {
      // TODO: Message lỗi này e nên tạo ra 1 file constant chứa các message lỗi 
      throw new UnauthorizedException('No token found');
    }
    return super.canActivate(context);
  }
}

