import { Module } from '@nestjs/common';
import { LoggerService } from '../../common/services/logger.service';
import { LoggerController } from '../../common/controller/logger.controller';

@Module({
  providers: [LoggerService],
  controllers: [LoggerController],
  exports: [LoggerService],
})
export class LoggerModule {}
