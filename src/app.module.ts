import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Student } from './student/student.entity';
import { Account } from './auth/auth.entity';
import { StudentService } from './student/student.service';
import { StudentController } from './student/student.controller';
import { ProtectedController } from './auth/jwt/protected.controller'; 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('TYPE') as any,
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Student, Account],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Student]),
    AuthModule,
  ],
  controllers: [StudentController, ProtectedController],
  providers: [StudentService],
})
export class AppModule {}
