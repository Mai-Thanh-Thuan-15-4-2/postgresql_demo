import { Controller, Get, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorator/roles.decorator';
import { Request } from 'express';
import { ERROR_MESSAGES } from '../../constants/enums/error-massage.enum';
import { LoggerService } from '../../constants/services/logger.service';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProtectedController {
  constructor(private readonly logger: LoggerService) 
  {
        this.logger.log('ProtectedController initialized');
  }

  @Get('protected')
  @Roles('admin')
  getProtectedResource(@Req() request: Request) {
    this.logger.log(`Access to protected resource by user with role: ${request.user?.role}`);
    return { message: ERROR_MESSAGES.AUTHORIZATION_EXIT_CODE[2001] };
  }

  @Get('admin')
  @Roles('admin')
  getAdminResource(@Req() request: Request) {
    this.logger.log(`Access to admin resource by user with role: ${request.user?.role}`);
    return { message: ERROR_MESSAGES.AUTHORIZATION_EXIT_CODE[2001] };
  }

  @Get('superadmin')
  @Roles('admin')
  getSuperAdminResource(@Req() request: Request) {
    this.logger.log(`Access to superadmin resource by user with role: ${request.user?.role}`);
    return { message: ERROR_MESSAGES.AUTHORIZATION_EXIT_CODE[2001] };
  }
}