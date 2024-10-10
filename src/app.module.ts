import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { typeOrmConfig } from './configs/databases/index';
import { LoggerModule } from './modules/log/logger.module';
import { StudentModule } from './modules/student/student.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TasksService } from './common/services/tasks.service';
import { EventListenerService } from './common/services/event-listener.service'; 
import { CacheService } from './common/services/cache.service';
import { CacheModule } from '@nestjs/cache-manager';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => typeOrmConfig(configService),
    }),
    AuthModule,
    LoggerModule,
    StudentModule,
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    CacheModule.register({
      ttl: 5, 
      max: 100,
    }),
  ],
  providers: [TasksService, EventListenerService, CacheService],
})
export class AppModule {}
