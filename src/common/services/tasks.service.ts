import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { StudentService } from './student.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class TasksService {
  constructor(
    private readonly studentService: StudentService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Cron(CronExpression.EVERY_WEEK)
  async sendWeeklyReminders() {
    const students = await this.studentService.findAll({page: 1, limit: 10});
    for (const student of students) {
      this.eventEmitter.emit('student.reminder', { student });
      console.log(`Sending reminder to ${student.email}`);
    }
  }
}
