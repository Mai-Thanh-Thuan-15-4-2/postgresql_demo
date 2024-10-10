import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class EventListenerService {
  @OnEvent('student.reminder')
  handleStudentReminderEvent(payload: any) {
    const { student } = payload;
    console.log('Reminder event received for student:', student.email);
  }
}
