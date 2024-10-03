import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: { username: string, password: string }): string {
    const { username, password } = body;
    if (this.authService.validateUser(username, password)) {
      return 'Login successful';
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
