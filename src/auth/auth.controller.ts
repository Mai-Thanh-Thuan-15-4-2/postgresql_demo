// AuthController
import { Controller, Post, Body, UnauthorizedException, Res, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { Response } from 'express';
import { HttpExceptionFilter } from '../http-exception.filter';

@Controller('auth')
@UseFilters(HttpExceptionFilter) 
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<{ success: boolean, role?: string }> {
    const { username, password } = loginDto;
    const { isValid, role, accessToken } = await this.authService.validateUser(username, password);
    if (isValid) {
      response.cookie('jwt', accessToken, { httpOnly: true });
      return { success: true, role };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
