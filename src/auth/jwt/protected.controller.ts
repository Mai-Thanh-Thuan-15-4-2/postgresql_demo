import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { Request } from 'express';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProtectedController {
  @Get('protected')
  @Roles('admin') //TODO: E nên tạo ra 1 file constant chứa các role
  getProtectedResource(@Req() request: Request) {
    return { message: 'Hello, account is valid!' }; //TODO: Message này e nên tạo ra 1 file constant chứa các message
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

//TODO: Này e chia folder hơi kỳ, vì nó chỉ chứa các file liên quan đến jwt, e nên tạo ra 1 folder riêng chứa các file liên quan đến jwt