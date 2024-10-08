import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AccountEntity } from '../entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { ERROR_MESSAGES } from '../constants/enums/error-massage.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<{ isValid: boolean; role?: string; accessToken?: string }> {
    const user = await this.accountRepository.findOne({ where: { username } });

    if (!user) {
      return { isValid: false };
    }

    const isMatch = await bcrypt.compare(password, user.pass);
    if (!isMatch) {
      return { isValid: false };
    }

    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role,
    };
    const accessToken = this.jwtService.sign(payload);
    return { isValid: true, role: user.role, accessToken };
  }
  async validateUserById(id: number): Promise<AccountEntity> {
    const user = await this.accountRepository.findOne({ where: { id } });

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    return user;
  }
  async register(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    role: string,
  ): Promise<AccountEntity> {
    const existingUser = await this.accountRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new ConflictException( {message: ERROR_MESSAGES.VALIDATION_EXIT_CODE[3009] });
    }
    const salt = this.configService.get<number>('SALT_ROUNDS', 10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = this.accountRepository.create({
      username,
      pass: hashedPassword,
      role,
    });

    return this.accountRepository.save(newUser);
  }
}
