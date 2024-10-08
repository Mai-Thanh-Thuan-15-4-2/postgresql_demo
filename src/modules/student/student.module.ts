import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { StudentController } from '../../common/controller/student.controller';
import { StudentService } from '../../common/services/student.service';
import { LoggerModule } from '@modules/log/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from '../../common/entities/student.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentEntity]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          cb(null, `${name}-${Date.now()}${fileExtName}`);
        },
      }),
    }),
    LoggerModule,
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
