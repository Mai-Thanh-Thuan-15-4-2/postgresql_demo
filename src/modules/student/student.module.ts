import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { StudentController } from '../../constants/controller/student.controller';
import { StudentService } from '../../constants/services/student.service';
import { LoggerModule } from '@modules/log/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../../constants/entities/student.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    MulterModule.register({
      dest: './uploads',
    }),
    LoggerModule,
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
