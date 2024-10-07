import { Module } from '@nestjs/common';
import { LoggerService } from '../../constants/services/logger.service';
import { LoggerController } from '../../constants/controller/logger.controller';

@Module({
  providers: [LoggerService],
  controllers: [LoggerController],
  exports: [LoggerService],
})
export class LoggerModule {}
