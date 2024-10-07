import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { Student } from './constants/entities/student.entity';
import { typeOrmConfig } from './configs/databases/index';
import { LoggerModule } from './modules/log/logger.module';
import { StudentModule } from './modules/student/student.module';
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
    StudentModule
  ],
})
export class AppModule {}
