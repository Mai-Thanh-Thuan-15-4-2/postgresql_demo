import { Controller, Get } from '@nestjs/common';
import { LoggerService } from '../services/logger.service';

@Controller('logger')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @Get('test')
  testLogging(): string {
    this.loggerService.log('Test logging message.');
    return 'Logged test message!';
  }
}
