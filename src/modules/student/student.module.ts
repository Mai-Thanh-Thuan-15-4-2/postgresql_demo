import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { StudentController } from '../../common/controller/student.controller';
import { StudentService } from '../../common/services/student.service';
import { LoggerModule } from '@modules/log/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from '../../common/entities/student.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CacheService } from '../../common/services/cache.service';
import { CacheModule } from '@nestjs/cache-manager';
import { TasksService } from 'src/common/services/tasks.service';

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
    CacheModule.register({
      ttl: 5,
      max: 100,
    }),
  ],
  controllers: [StudentController],
  providers: [StudentService, CacheService, TasksService],
  exports: [StudentService],

})
export class StudentModule {}
