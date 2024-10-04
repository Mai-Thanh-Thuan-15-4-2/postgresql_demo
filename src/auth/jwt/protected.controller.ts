import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { Request } from 'express';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProtectedController {
  @Get('protected')
  @Roles('admin')
  getProtectedResource(@Req() request: Request) {
    return { message: 'Hello, account is valid!' };
  }

  @Get('admin')
  @Roles('admin')
  getAdminResource(@Req() request: Request) {
    return { message: 'Hi, Welcome to admin page!' };
  }

  @Get('superadmin')
  @Roles('admin')
  getSuperAdminResource(@Req() request: Request) {
    return { message: 'SuperAdmin!!!!!! welcome welcome' };
  }
}

