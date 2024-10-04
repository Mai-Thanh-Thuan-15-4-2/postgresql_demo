import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'school', name: 'student' })
export class Student {
  @PrimaryGeneratedColumn()
  student_id: number;

  @Column({ type: 'varchar', length: 50 })
  first_name: string;

  @Column({ type: 'varchar', length: 50 })
  last_name: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth: Date;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  enrollment_date: Date;
}
