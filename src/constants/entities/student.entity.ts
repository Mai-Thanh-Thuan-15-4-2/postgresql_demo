import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, IsOptional, Length, IsInt, IsBoolean } from 'class-validator';

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

  @Column({ type: 'varchar', length: 100, unique: true })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  @IsOptional()
  gender: string;

  @Column({ type: 'boolean', nullable: true })
  @IsOptional()
  @IsBoolean()
  part_time_job: boolean;

  @Column({ type: 'int', nullable: true })
  @IsOptional()
  @IsInt()
  absence_days: number;

  @Column({ type: 'boolean', nullable: true })
  @IsOptional()
  extracurricular_activities: boolean;

  @Column({ type: 'int', nullable: true })
  @IsOptional()
  @IsInt()
  weekly_self_study_hours: number;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  career_aspiration: string;

  @Column({ type: 'int', nullable: true })
  @IsOptional()
  @IsInt()
  math_score: number;

  @Column({ type: 'int', nullable: true })
  @IsOptional()
  @IsInt()
  history_score: number;

  @Column({ type: 'int', nullable: true })
  @IsOptional()
  @IsInt()
  physics_score: number;

  @Column({ type: 'int', nullable: true })
  @IsOptional()
  @IsInt()
  chemistry_score: number;

  @Column({ type: 'int', nullable: true })
  @IsOptional()
  @IsInt()
  biology_score: number;

  @Column({ type: 'int', nullable: true })
  @IsOptional()
  @IsInt()
  english_score: number;

  @Column({ type: 'int', nullable: true })
  @IsOptional()
  @IsInt()
  geography_score: number;
}
