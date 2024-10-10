import { Module } from '@nestjs/common';
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule';
import { TasksService } from '../../common/services/tasks.service';

@Module({
  imports: [NestScheduleModule.forRoot()],
  providers: [TasksService],
})
export class AppScheduleModule {}
