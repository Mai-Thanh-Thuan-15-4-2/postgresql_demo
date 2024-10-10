import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { StudentService } from '../../common/services/student.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: 5, 
      max: 100,
    }),
  ],
  providers: [StudentService],
})
export class CacheManagerModule {}

