import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Res,
  UseFilters,
  Req,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { Response, Request } from 'express';
import { HttpExceptionFilter } from '../../constants/filters/http-exception.filter';
import { Account } from '../../constants/entities/auth.entity';
import { ERROR_MESSAGES } from '../../constants/enums/error-massage.enum';
import { LoggerService } from '../../constants/services/logger.service';

@Controller('auth')
@UseFilters(HttpExceptionFilter) //TODO: e cos the import no o muc global de khong can phai import o tung controller
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: LoggerService,
  ) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ success: boolean; role?: string }> {
    const { username, password } = loginDto;
    const { isValid, role, accessToken } = await this.authService.validateUser(
      username,
      password,
    );
    console.log(accessToken);
    if (isValid) {
      response.cookie('jwt', accessToken, { httpOnly: true });
      this.logger.log(`User ${username} logged in successfully.`);
      return { success: true, role };
    } else {
      this.logger.error(
        `Failed login attempt for user ${username}.`,
        ERROR_MESSAGES.AUTHENTICATION_EXIT_CODE[1002],
      );
      throw new UnauthorizedException({
        message: ERROR_MESSAGES.AUTHENTICATION_EXIT_CODE[1002],
      });
    }
  }

  /**
   * 1. Validate LoginDto not working
   *
   *
   */

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<{ success: boolean; user: Account }> {
    //TODO: nhớ validate nha e
    const { firstName, lastName, email, username, password, role } =
      registerDto;
    if (!role) {
      this.logger.error(
        'Role is required for registration.',
        ERROR_MESSAGES.VALIDATION_EXIT_CODE[3008],
      );
      throw new UnauthorizedException({
        message: ERROR_MESSAGES.VALIDATION_EXIT_CODE[3008],
      });
    }
    const user = await this.authService.register(
      firstName,
      lastName,
      email,
      username,
      password,
      role,
    );
    this.logger.log(`User ${username} registered successfully.`);
    return { success: true, user };
  }

  @Post('logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ success: boolean }> {
    try {
      const { username } = request.user as any;
      response.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
      this.logger.log(`User ${username} logged out successfully.`);
      return { success: true };
    } catch (error) {
      this.logger.error('Error during logout', error.message);
      throw new UnauthorizedException({
        message: ERROR_MESSAGES.SERVER_EXIT_CODE[6001],
      });
    }
  }
}
