import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  private readonly users = [
    { username: 'thuan', password: '123' },
  ];

  validateUser(username: string, password: string): boolean {
    const user = this.users.find(user => user.username === username && user.password === password);
    if (user) {
      return true;
    }
    return false;
  }
}
