import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Account } from './auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<{ isValid: boolean, role?: string, accessToken?: string }> {
    const user = await this.accountRepository.findOne({ where: { username: username } });
    if (user && user.pass === password) {
      const payload = { username: user.username, sub: user.id, role: user.role };
      const accessToken = this.jwtService.sign(payload);
      return { isValid: true, accessToken };
    }
    return { isValid: false };
  }
  
}
