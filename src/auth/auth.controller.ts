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
      // TODO: này nữa nhan e
      response.cookie('jwt', accessToken, { httpOnly: true });
      return { success: true, role }; //TODO: Mấy cái cái response này e nên thống nhất 1 kiểu trả về thui nha
    } else {
      throw new UnauthorizedException('Invalid credentials'); //TODO: Message lỗi này e nên tạo ra 1 file constant chứa các message lỗi
    }
  }
}
