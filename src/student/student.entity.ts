import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, IsOptional, Length, IsDate } from 'class-validator';

@Entity({ schema: 'school', name: 'student' })
export class Student {
  @PrimaryGeneratedColumn()
  student_id: number;

  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty()
  @Length(1, 50)
  first_name: string;

  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty()
  @Length(1, 50)
  last_name: string;

  @Column({ type: 'date', nullable: true })
  @IsOptional()
  @IsDate()
  date_of_birth: Date;

  @Column({ type: 'varchar', length: 100, unique: true })
  @IsEmail()
  email: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  enrollment_date: Date;
}
