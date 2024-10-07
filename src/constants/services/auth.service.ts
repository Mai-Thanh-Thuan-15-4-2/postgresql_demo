import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Account } from '../../constants/entities/auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<{ isValid: boolean; role?: string; accessToken?: string }> {
    const user = await this.accountRepository.findOne({
      where: { username: username },
    });
    // if(!user) {
    //   // return error
    // }

    // const isMatch = await bcrypt.compare(password, user.pass);
    // if (!isMatch) {
    //   // return error
    // }

    if (user && (await bcrypt.compare(password, user.pass))) {
      // TODO: e để cái await vô if kì quá
      const payload = {
        username: user.username,
        sub: user.id,
        role: user.role,
      };
      const accessToken = this.jwtService.sign(payload);
      return { isValid: true, role: user.role, accessToken };
    }
    return { isValid: false };
  }

  async register(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    role: string,
  ): Promise<Account> {
    const hashedPassword = await bcrypt.hash(password, 10); //TODO: salt nên để ở config env
    const newUser = this.accountRepository.create({
      username,
      pass: hashedPassword,
      role,
    });
    // TODO: Nên có bước kiểm tra user có tồn tại hay chưa
    return this.accountRepository.save(newUser);
  }
}
